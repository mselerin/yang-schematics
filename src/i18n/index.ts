import {Schema as I18NOptions} from './schema';
import {apply, chain, MergeStrategy, mergeWith, move, Rule, SchematicsException, Tree, url} from '@angular-devkit/schematics';
import * as CJSON from 'comment-json';
import {extraDevDependencies} from './dependencies';
import {CodeUtils} from '../utils/code-utils';
import {installDeps, sortByKey, YangUtils} from '../utils/yang-utils';

export default function (options: I18NOptions): Rule {
  return () => {
    return chain([
      addFiles(),
      updatePackageJson(),
      updateCore(),
      updateShared(),
      installDeps(options.skipInstall)
    ]);
  };
}


function addFiles(): (tree: Tree) => Rule {
  return (tree: Tree) => {
    return mergeWith(apply(url('./files'), [
      move(''),
    ]), MergeStrategy.Overwrite);
  }
}


function updatePackageJson(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const filePath = 'package.json';
    if (!tree.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = tree.read(filePath);
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

    const json = CJSON.parse(source.toString('utf-8'));

    // Add dependencies
    json.dependencies = {
      ...json.dependencies,
      ...extraDevDependencies
    };

    // Sort dependencies by name
    json.dependencies = sortByKey(json.dependencies);

    tree.overwrite(filePath, CJSON.stringify(json, null, 2));
    return tree;
  };
}

function updateCore(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const filePath = YangUtils.CORE_MODULE_FILE;
    if (!tree.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const sourceFile = CodeUtils.readSourceFile(tree, filePath);

    CodeUtils.addImport(sourceFile, 'I18NModule', './i18n.module');
    CodeUtils.addImport(sourceFile, 'init as i18nInitializer', './i18n.initializer');
    CodeUtils.insertInVariableArray(sourceFile, 'INITIALIZERS', 'i18nInitializer');
    CodeUtils.insertInVariableArray(sourceFile, 'MODULES', 'I18NModule');

    CodeUtils.writeSourceFile(tree, filePath, sourceFile);
    return tree;
  };
}

function updateShared(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const filePath = YangUtils.SHARED_MODULE_FILE;
    if (!tree.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const sourceFile = CodeUtils.readSourceFile(tree, filePath);

    CodeUtils.addImport(sourceFile, 'TranslateModule', '@ngx-translate/core');
    CodeUtils.insertInVariableArray(sourceFile, 'MODULES', 'TranslateModule');

    CodeUtils.writeSourceFile(tree, filePath, sourceFile);
    return tree;
  };
}
