import {Schema as InitOptions} from './schema';
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
import {strings} from '@angular-devkit/core';
import * as path from "path";
import {EOL} from "os";
import {forceOverwrite} from '../utils/yang-utils';
import {CodeUtils} from '../utils/code-utils';
import {getWorkspace, updateWorkspace} from "@schematics/angular/utility/config";
import {latestVersions} from "@schematics/angular/utility/latest-versions";

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
      updateProjectWorkspace(),

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
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

    const json = JSON.parse(source.toString('utf-8'));

    json.scripts = {
      ...json.scripts,
      'build': 'ng build --prod'
    };

    json.dependencies = {
      ...json.dependencies,
      'whatwg-fetch': '~3.0.0',
      '@ngx-translate/core': '~11.0.1',
      'rxjs-compat': latestVersions.RxJs
    };

    json.devDependencies[pkg.name] = `~${pkg.version}`;

    json.devDependencies = {
      ...json.devDependencies,
      'ngx-build-plus': '~7.2.3'
    };

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
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

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



function updateProjectWorkspace(): (host: Tree) => Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = workspace.defaultProject as string;

    workspace.cli = {
      'defaultCollection': 'yang-schematics'
    };

    const architect = workspace.projects[project].architect;
    if (!architect) throw new Error(`expected node projects/${project}/architect in angular.json`);

    const build = architect.build;
    if (!build) throw new Error(`expected node projects/${project}/architect/build in angular.json`);

    const test = architect.test;
    if (!test) throw new Error(`expected node projects/${project}/architect/test in angular.json`);

    // Add stylePreprocessorOptions
    const stylePreprocessorOptions = {
      "includePaths": [
        "src/assets/styles"
      ]
    };

    (<any>build.options)['stylePreprocessorOptions'] = stylePreprocessorOptions;
    (<any>test.options)['stylePreprocessorOptions'] = stylePreprocessorOptions;


    // Add ngx-build-plus
    build.builder = <any>'ngx-build-plus:build';
    (<any>build.options)['extraWebpackConfig'] = 'webpack.extra.js';

    const serve = architect.serve;
    if (!serve) throw new Error(`expected node projects/${project}/architect/serve in angular.json`);

    serve.builder = <any>'ngx-build-plus:dev-server';
    (<any>serve.options)['extraWebpackConfig'] = 'webpack.extra.js';

    return updateWorkspace(workspace);
  }
}
