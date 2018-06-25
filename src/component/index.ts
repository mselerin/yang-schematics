import { Schema as ComponentOptions } from './schema';
import {
  apply,
  chain,
  externalSchematic,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { Schema as NgComponentOptions } from '@schematics/angular/component/schema';
import { basename, normalize, Path, strings } from '@angular-devkit/core';
import * as path from 'path';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { YangUtils } from '../utils/yang-utils';

export default function (options: ComponentOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.project) {
      const workspace = getWorkspace(host);
      options.project = workspace.defaultProject;
    }

    // Smart detect if shared or feature_name
    if (options.name.includes('/')) {
      let nameArgs: string[] = options.name.split('/');
      let classifier: string = nameArgs.shift() as string;
      options.name = nameArgs.pop() as string;

      if (!options.path) {
        if ('shared' === classifier) {
          options.path = path.join('src', 'app', 'shared', ...nameArgs);
        }

        else {
          options.path = path.join('src', 'app', 'features', classifier, ...nameArgs);
        }
      }
    }

    if (!options.path) {
      options.path = path.join('src', 'app', 'shared', 'components');
    }

    options.path = normalize(options.path || '');
    options.module = findModuleFromOptions(host, options);

    const componentOptions: NgComponentOptions = {
      name: options.name,
      project: options.project,
      path: options.path,
      spec: options.spec,
      inlineStyle: (options.styles !== undefined ? !options.styles : undefined),
      inlineTemplate: (options.template !== undefined ? !options.template : undefined),
      flat: options.flat,
      styleext: 'scss',
      skipImport: true
    };


    return chain([
      externalSchematic('@schematics/angular', 'component', componentOptions),
      mergeWith(apply(url('./files'), [
        options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
        template({
          ...strings,
          'if-flat': (s: string) => options.flat ? '' : s,
          ...options
        }),
        move(options.path)
      ]), MergeStrategy.Overwrite),

      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: ComponentOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (!options.module)
      return host;

    const file = options.module as string;
    let baseDir = '.';

    if (options.module === YangUtils.SHARED_MODULE_FILE) {
      baseDir = `./components`;
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
      `${strings.classify(options.name)}Component`, `${baseDir}/${strings.dasherize(options.name)}.component`);

    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Component`);
    host.overwrite(file, sourceFile.getFullText());


    let path = options.path as string;

    if (path.includes('src/app/features/')) {
      if (options.routing)
        updateFeatureRouting(options, host);
    }

    return host;
  };
}



function updateFeatureRouting(options: ComponentOptions, host: Tree): void {
  if (!options.module)
    return;

  let moduleName = basename(options.module as Path) as string;
  moduleName = moduleName.replace('.module.ts', '');

  // Ajouter la route
  const file = options.module.replace('.module.ts', '-routing.module.ts');
  const text = host.read(file);
  if (text === null) {
    throw new SchematicsException(`File ${file} does not exist.`);
  }

  if (options.route === undefined) {
    options.route = strings.dasherize(options.name);
  }

  const sourceText = text.toString('utf-8');
  const sourceFile = CodeUtils.getSourceFile(file, sourceText);

  let compDir = `.`;
  if (!options.flat)
    compDir += `/${strings.dasherize(options.name)}`;

  CodeUtils.addImport(sourceFile,
    `${strings.classify(options.name)}Component`, `${compDir}/${strings.dasherize(options.name)}.component`);

  CodeUtils.insertInVariableArray(sourceFile, `${strings.classify(moduleName)}Routes`,
    `    { path: '${options.route}', component: ${strings.classify(options.name)}Component }`
  );

  host.overwrite(file, sourceFile.getFullText());
}
