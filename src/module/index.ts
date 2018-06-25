import { Schema as ModuleOptions } from './schema';
import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';

export default function (options: ModuleOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.project) {
      const workspace = getWorkspace(host);
      options.project = workspace.defaultProject;
    }

    return chain([
      externalSchematic('@schematics/angular', 'module', {
        name: options.name,
        path: 'src/app/shared/modules',
        project: options.project,
        spec: options.spec,
        skipImport: true,
        flat: true
      }),

      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: ModuleOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const file = YangUtils.SHARED_MODULE_FILE;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    CodeUtils.addImport(sourceFile,
      `${strings.classify(options.name)}Module`, `./modules/${strings.dasherize(options.name)}.module`);

    CodeUtils.insertInVariableArray(sourceFile, "MODULES", `   ${strings.classify(options.name)}Module`);
    host.overwrite(file, sourceFile.getFullText());

    return host;
  };
}
