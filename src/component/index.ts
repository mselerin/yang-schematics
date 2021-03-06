import {Schema as ComponentOptions} from './schema';
import {chain, externalSchematic, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {CodeUtils} from '../utils/code-utils';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {parseName} from '@schematics/angular/utility/parse-name';
import {findClosestModule, getProjectSchematic, getSourceRoot, smartPath} from '../utils/yang-utils';

export default function (options: ComponentOptions): Rule {
  return async (host: Tree) => {
    const rootPath = getSourceRoot(host, options);
    smartPath(rootPath, options, 'components');

    if (!options.path) {
      options.path = `${rootPath}/shared/components`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;
    options.module = findClosestModule(host, options, 'shared');

    const schematic = await getProjectSchematic(host, options, '@schematics/angular:component');
    options.inlineStyle = options.inlineStyle ?? schematic.inlineStyle;
    options.inlineTemplate = options.inlineTemplate ?? schematic.inlineTemplate;
    options.flat = options.flat ?? schematic.flat ?? false;
    options.skipTests = options.skipTests ?? schematic.skipTests ?? false;

    if (!options.entryComponent) {
      delete options.entryComponent;
    }

    const ngOptions = {
      ...options,
      skipImport: true
    };

    return chain([
      externalSchematic('@schematics/angular', 'component', ngOptions),
      addToNgModule(options)
    ]);
  };
}


function addToNgModule(options: ComponentOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (!options.module || options.skipImport)
      return host;

    const file = options.module;

    // If features module: warn & skip !
    if (file === '/src/app/features/features.module.ts') {
      console.log(yellow('Cannot declare component inside features module: skipping import.'));
      return host;
    }

    const sourceFile = CodeUtils.readSourceFile(host, file);

    const componentPath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.component';

    const relativePath = buildRelativePath(options.module, componentPath);
    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Component`, relativePath);

    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `${strings.classify(options.name)}Component`);
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
    `{ path: '${options.route}', component: ${strings.classify(options.name)}Component }`
  );

  CodeUtils.writeSourceFile(host, file, sourceFile);
}


function yellow(str: string): string {
  return `\x1b[33m${str}\x1b[0m`;
}
