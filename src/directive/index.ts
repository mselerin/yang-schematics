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
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';

export default function (options: DirectiveOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      options.project = workspace.defaultProject;
    }
    const project = workspace.projects[options.project as string];

    if (!options.path) {
      const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
      options.path = `/${project.root}/src/${projectDirName}/shared/directives`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);

    return chain([
      externalSchematic('@schematics/angular', 'directive', {
        name: options.name,
        path: options.path,
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
    if (options.skipImport || !options.module)
      return host;

    const file = options.module;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);


    const directivePath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.directive';

    const relativePath = buildRelativePath(options.module, directivePath);

    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Directive`, relativePath);
    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Directive`);

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
