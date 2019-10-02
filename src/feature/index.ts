import { Schema as FeatureOptions } from './schema';
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { getRootPath, YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';

export default function (options: FeatureOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getRootPath(host, options);

    let originalName = options.name;

    if (options.name.includes('/')) {
      let nameArgs: string[] = options.name.split('/');

      options.name = nameArgs.pop() as string;
      options.path = nameArgs.join('/');
    }

    options.path = `${rootPath}/features/${options.path || ''}/${strings.dasherize(options.name)}`;

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);


    const templateSource = apply(url('./files'), [
      options.skipTests ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options
      }),
      move(options.path)
    ]);

    const createComp = options.component ? schematic('component', {
      project: options.project,
      name: originalName,
      path: options.path,
      routing: true,
      route: '',
      flat: true,
      styleext: options.styleext,
      template: options.template,
      styles: options.styles
    }) : noop();


    return chain([
      mergeWith(templateSource),
      createComp,
      updateRouting(options)
    ])(host, context);
  };
}


function updateRouting(options: FeatureOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (!options.module)
      return host;

    let file = '';
    let varName = '';

    if (options.module === YangUtils.FEATURES_MODULE_FILE) {
      file = YangUtils.FEATURES_MODULE_FILE;
      varName = 'FEATURES_ROUTES';
    }
    else {
      file = options.module.replace('.module.ts', '-routing.module.ts');
      varName = 'ROUTES';
    }

    // Ajouter la route
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    let path = (options.path || '').replace('/src/app/', '@app/');

    CodeUtils.insertInVariableArray(sourceFile, varName,
      `    { path: '${strings.dasherize(options.name)}', loadChildren: () => import('${path}/${strings.dasherize(options.name)}.module').then(m => m.${strings.classify(options.name)}Module) }`
    );

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
