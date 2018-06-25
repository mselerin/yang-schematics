import { Schema as FeatureOptions } from './schema';
import {
  apply,
  chain, externalSchematic, filter,
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
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';

export default function (options: FeatureOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.project) {
      const workspace = getWorkspace(host);
      options.project = workspace.defaultProject;
    }

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options
      }),
      move(`src/app/features/${strings.dasherize(options.name)}`)
    ]);


    const createComp = options.component ? schematic('component', {
      name: options.name,
      project: options.project,
      feature: options.name,
      routing: true,
      route: '',
      flat: true,
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
    // Ajouter la route
    const file = YangUtils.FEATURES_MODULE_FILE;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    CodeUtils.insertInVariableArray(sourceFile, "FEATURES_ROUTES",
      `    { path: '${strings.dasherize(options.name)}', loadChildren: '@app/features/${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.module#${strings.classify(options.name)}Module' }`
    );

    host.overwrite(file, sourceFile.getFullText());
    return host;
  };
}
