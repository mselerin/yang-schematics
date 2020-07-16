import {Schema as DirectiveOptions} from './schema';
import {chain, externalSchematic, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {CodeUtils} from '../utils/code-utils';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {parseName} from '@schematics/angular/utility/parse-name';
import {findClosestModule, getRootPath, smartPath} from '../utils/yang-utils';

export default function (options: DirectiveOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getRootPath(host, options);
    smartPath(rootPath, options);

    if (!options.path) {
      options.path = `${rootPath}/shared/directives`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.module = findClosestModule(host, options, 'shared');

    const ngOptions = {
      ...options,
      skipImport: true
    };

    return chain([
      externalSchematic('@schematics/angular', 'directive', ngOptions),
      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: DirectiveOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (options.skipImport || !options.module)
      return host;

    const file = options.module;
    const sourceFile = CodeUtils.readSourceFile(host, file);

    const directivePath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.directive';

    const relativePath = buildRelativePath(options.module, directivePath);

    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Directive`, relativePath);
    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `${strings.classify(options.name)}Directive`);

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
