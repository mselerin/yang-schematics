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
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';

export default function (options: ModuleOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      options.project = workspace.defaultProject;
    }
    const project = workspace.projects[options.project as string];

    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    const rootPath = `/${project.root}/src/${projectDirName}`;

    // Smart detect if shared or feature_name
    if (options.name.includes('/')) {
      let nameArgs: string[] = options.name.split('/');
      let classifier: string = nameArgs.shift() as string;
      options.name = nameArgs.pop() as string;

      if ('shared' === classifier) { // src/app/shared/modules/.../<name>
        options.path = `${rootPath}/shared/modules/${nameArgs.join('/')}`;
      }

      else { // src/app/features/<classifier>/.../<name>
        options.path = `${rootPath}/features/${classifier}/${nameArgs.join('/')}`;
      }
    }

    if (!options.path) {
      options.path = `${rootPath}/shared/modules`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);

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
    if (!options.module)
      return host;

    const file = options.module;
    let baseDir = (options.path || '').replace('/src/app/', '@app/');

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
