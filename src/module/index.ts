import * as path from 'path';
import { Schema as ModuleOptions } from './schema';
import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';

export default function (options: ModuleOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    // Smart detect if shared or feature_name
    if (options.name.includes('/')) {
      let nameArgs: string[] = options.name.split('/');
      let classifier: string = nameArgs.shift() as string;

      if ('shared' === classifier) {
        options.feature = '';
        options.name = nameArgs.join('/');
      }

      else {
        // First argument is a feature name
        options.feature = classifier;
        options.name = nameArgs.join('/');
      }
    }

    if (options.feature) {
      options.path = path.join('src', 'app', 'features', strings.dasherize(options.feature));
    }
    else {
      options.path = path.join('src', 'app', 'shared', 'modules');
    }

    options.path = normalize(options.path || '');

    if (!options.project) {
      const workspace = getWorkspace(host);
      options.project = workspace.defaultProject;
    }

    return chain([
      externalSchematic('@schematics/angular', 'module', {
        name: options.name,
        path: options.path,
        project: options.project,
        spec: options.spec,
        flat: options.flat
      }),

      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: ModuleOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    let file = '';
    let baseDir = '';

    if (options.feature) {
      file = `src/app/features/${strings.dasherize(options.feature)}/${strings.dasherize(options.feature)}.module.ts`;
      baseDir = `.`;
    }
    else {
      file = YangUtils.SHARED_MODULE_FILE;
      baseDir = `./modules`;
    }

    if (!options.flat)
      baseDir += `/${strings.dasherize(options.name)}`;


    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    CodeUtils.addImport(sourceFile,
      `${strings.classify(options.name)}Module`, `${baseDir}/${strings.dasherize(options.name)}.module`);

    CodeUtils.insertInVariableArray(sourceFile, "MODULES", `   ${strings.classify(options.name)}Module`);
    host.overwrite(file, sourceFile.getFullText());

    return host;
  };
}
