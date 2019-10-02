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
import { strings, terminal } from '@angular-devkit/core';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { getRootPath, smartPath } from '../utils/yang-utils';

export default function (options: ComponentOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getRootPath(host, options);
    smartPath(rootPath, options, 'components');

    if (!options.path) {
      options.path = `${rootPath}/shared/components`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);



    const workspace = getWorkspace(host);
    const project = workspace.projects[options.project as string];

    let inlineStyle = options.inlineStyle;
    let inlineTemplate = options.inlineTemplate;

    if (project.schematics && project.schematics['@schematics/angular:component']) {
      if (inlineStyle === undefined)
        inlineStyle = project.schematics['@schematics/angular:component'].inlineStyle;

      if (inlineTemplate === undefined)
        inlineTemplate = project.schematics['@schematics/angular:component'].inlineTemplate;
    }

    options.inlineStyle = (options.styles !== undefined ? !options.styles : inlineStyle);
    options.inlineTemplate = (options.template !== undefined ? !options.template : inlineTemplate);

    const ngOptions = {
      ...options,
      skipImport: true
    };

    return chain([
      externalSchematic('@schematics/angular', 'component', ngOptions),
      mergeWith(apply(url('./files'), [
        options.skipTests ? noop() : filter(path => !path.endsWith('.spec.ts')),
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
    if (!options.module || options.skipImport)
      return host;

    const file = options.module;

    // If features module: warn & skip !
    if (file === '/src/app/features/features.module.ts') {
      console.log(terminal.yellow('Cannot declare component inside features module: skipping import.'));
      return host;
    }

    const sourceFile = CodeUtils.readSourceFile(host, file);

    const componentPath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.component';

    const relativePath = buildRelativePath(options.module, componentPath);


    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Component`, relativePath);

    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Component`);
    CodeUtils.writeSourceFile(host, file, sourceFile);


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

  // Ajouter la route
  const file = options.module.replace('.module.ts', '-routing.module.ts');
  const sourceFile = CodeUtils.readSourceFile(host, file);

  if (options.route === undefined) {
    options.route = strings.dasherize(options.name);
  }


  const componentPath = `/${options.path}/`
    + (options.flat ? '' : strings.dasherize(options.name) + '/')
    + strings.dasherize(options.name)
    + '.component';

  const relativePath = buildRelativePath(file, componentPath);

  CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Component`, relativePath);
  CodeUtils.insertInVariableArray(sourceFile, 'ROUTES',
    `    { path: '${options.route}', component: ${strings.classify(options.name)}Component }`
  );

  CodeUtils.writeSourceFile(host, file, sourceFile);
}
