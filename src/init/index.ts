import { Schema as InitOptions } from './schema';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from "path";
import { EOL } from "os";
import { forceOverwrite } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

export default function (options: InitOptions): Rule {
  return (host: Tree, context: SchematicContext) => {

    options.name = options.name || path.basename(process.cwd());
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    return chain([
      mergeWith(apply(url('./files/root'), [
        template({
          ...strings,
          ...options,
          buildDate: new Date().toISOString()
        }),
        move(''),
        forceOverwrite(host)
      ]), MergeStrategy.Overwrite),

      updatePackageJson(),
      updateTsConfig(),
      updateGitIgnore(),
      updatePolyfills(),
      updateEnvironments(),
      updateAngularJson(),

      schematic('feature', {
        name: 'home',
        component: true,
        template: true,
        styles: true
      }),

      mergeWith(apply(url('./files/home'), [
        template({
          ...strings,
          ...options
        }),
        move('src/app/features/home'),
      ]), MergeStrategy.Overwrite)
    ])(host, context);
  };
}


function updatePackageJson(): (host: Tree) => Tree {
  return (host: Tree) => {
    const pkg = require('../../package.json');

    const filePath = 'package.json';
    if (!host.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = host.read(filePath);
    if (!source)
      return host;

    const json = JSON.parse(source.toString('utf-8'));

    json.scripts = {
      ...json.scripts,
      'build': 'ng build --prod',
      'prebuild': 'node prebuild.js',
      'prestart': 'node prebuild.js'
    };

    json.dependencies = {
      ...json.dependencies,
      'whatwg-fetch': '^2.0.4',
      '@ngx-translate/core': '^10.0.1',
      'rxjs-compat': '^6.1.0'
    };

    json.devDependencies[pkg.name] = `^${pkg.version}`;

    host.overwrite(filePath, JSON.stringify(json, null, 2));
    return host;
  };
}



function updateTsConfig(): (host: Tree) => Tree {
  return (host: Tree) => {
    const filePath = 'tsconfig.json';
    if (!host.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = host.read(filePath);
    if (!source)
      return host;

    const json = JSON.parse(source.toString('utf-8'));

    json.compilerOptions = {
      ...json.compilerOptions,
      "paths": {
        "@app/*": ["src/app/*"],
        "@env/*": ["src/environments/*"]
      }
    };

    host.overwrite(filePath, JSON.stringify(json, null, 2));
    return host;
  };
}


function updateGitIgnore(): (host: Tree) => Tree {
  return (host: Tree) => {
    const filePath = '.gitignore';
    if (!host.exists(filePath))
      return host;

    const source = host.read(filePath);
    if (!source)
      return host;

    let content = source.toString('utf-8');
    content += `${EOL}# Custom Files${EOL}`;
    content += `*.iml${EOL}`;
    content += `/src/assets/app-manifest.json${EOL}`;

    host.overwrite(filePath, content);
    return host;
  };
}


function updatePolyfills(): (host: Tree) => Tree {
  return (host: Tree) => {
    const filePath = 'src/polyfills.ts';
    if (!host.exists(filePath))
      return host;

    const source = host.read(filePath);
    if (!source)
      return host;

    let content = source.toString('utf-8');
    content += `import 'whatwg-fetch';${EOL}`;

    host.overwrite(filePath, content);
    return host;
  };
}

function updateEnvironments(): (host: Tree) => Tree {
  return (host: Tree) => {
    updateEnvironment(host, 'src/environments/environment.ts');
    updateEnvironment(host, 'src/environments/environment.prod.ts');
    return host;
  };
}

function updateEnvironment(host: Tree, file: string): void {
  if (!host.exists(file))
    return;

  const text = host.read(file);
  if (text === null) {
    return;
  }

  const sourceText = text.toString('utf-8');
  const sourceFile = CodeUtils.getSourceFile(file, sourceText);

  CodeUtils.insertInVariableObject(sourceFile, "environment", `  apiUrl: '/api/'`);
  host.overwrite(file, sourceFile.getFullText());
}


function updateAngularJson(): (host: Tree) => Tree {
  return (host: Tree) => {
    const filePath = 'angular.json';
    if (!host.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = host.read(filePath);
    if (!source)
      return host;

    const json = JSON.parse(source.toString('utf-8'));

    // Add yang-schematics as default collection
    json['cli'] = {
      'defaultCollection': 'yang-schematics'
    };

    const defaultProject = json.defaultProject;
    let architect = json.projects[defaultProject].architect;
    if (!architect)
      architect = json.projects[defaultProject].targets;

    // Add stylePreprocessorOptions
    const stylePreprocessorOptions = {
      "includePaths": [
        "src/assets/styles"
      ]
    };

    architect.build.options['stylePreprocessorOptions'] = stylePreprocessorOptions;
    architect.test.options['stylePreprocessorOptions'] = stylePreprocessorOptions;

    host.overwrite(filePath, JSON.stringify(json, null, 2));
    return host;
  }
}
