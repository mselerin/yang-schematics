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
import { strings } from '@angular-devkit/core';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';

export default function (options: ComponentOptions): Rule {
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

      if (!options.path) {
        if ('shared' === classifier)
          options.path = `${rootPath}/shared/${nameArgs.join('/')}`;
        else
          options.path = `${rootPath}/features/${classifier}/${nameArgs.join('/')}`;
      }
    }

    if (!options.path) {
      options.path = `${rootPath}/shared/components`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

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

    const file = options.module;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);


    const componentPath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.component';

    const relativePath = buildRelativePath(options.module, componentPath);


    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Component`, relativePath);

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
