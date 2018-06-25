import { Schema as DirectiveOptions } from './schema';
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

export default function (options: DirectiveOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.project) {
      const workspace = getWorkspace(host);
      options.project = workspace.defaultProject;
    }

    return chain([
      externalSchematic('@schematics/angular', 'directive', {
        name: options.name,
        path: 'src/app/shared/directives',
        project: options.project,
        spec: options.spec,
        skipImport: true,
        flat: true
      }),

      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: DirectiveOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const file = YangUtils.SHARED_MODULE_FILE;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    CodeUtils.addImport(sourceFile,
      `${strings.classify(options.name)}Directive`, `./directives/${strings.dasherize(options.name)}.directive`);

    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Directive`);
    host.overwrite(file, sourceFile.getFullText());

    return host;
  };
}
