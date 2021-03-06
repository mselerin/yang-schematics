import {Schema as InitOptions} from './schema';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {updateWorkspace} from '@schematics/angular/utility/workspace';
import * as path from 'path';
import {EOL} from 'os';
import {forceOverwrite, getProjectName, getProjectRoot, sortByKey} from '../utils/yang-utils';
import {CodeUtils} from '../utils/code-utils';
import {extraDependencies, extraDevDependencies} from './dependencies';
import * as CJSON from 'comment-json';


export default function (options: InitOptions): Rule {
  return (host: Tree) => {
    options.name = options.name || path.basename(process.cwd());
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    const root = getProjectRoot(host, options);
    const projectName = getProjectName(host, options);

    return chain([
      mergeWith(apply(url('./files/root'), [
        template({
          ...strings,
          ...options,
          buildDate: new Date().toISOString()
        }),
        move(root),
        forceOverwrite(host)
      ]), MergeStrategy.Overwrite),

      updatePackageJson(),
      updateTsConfig(options),
      updateGitIgnore(),
      updatePolyfills(options),
      updateKarmaTest(options),
      updateEnvironments(options),
      updateProjectWorkspace(options),

      schematic('feature', {
        project: projectName,
        name: 'home',
        component: true,
        inlineTemplate: false,
        inlineStyle: false
      }),

      mergeWith(apply(url('./files/home'), [
        template({
          ...strings,
          ...options
        }),
        move(path.join(root, 'src/app/features/home')),
      ]), MergeStrategy.Overwrite)
    ]);
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

    const json = CJSON.parse(source.toString('utf-8'));

    json.scripts = {
      ...json.scripts,
      'build': 'ng build --prod'
    };

    json.dependencies = {
      ...json.dependencies,
      ...extraDependencies
    };

    json.devDependencies[pkg.name] = `~${pkg.version}`;

    json.devDependencies = {
      ...json.devDependencies,
      ...extraDevDependencies
    };

    // Sort dependencies by name
    json.dependencies = sortByKey(json.dependencies);
    json.devDependencies = sortByKey(json.devDependencies);

    host.overwrite(filePath, CJSON.stringify(json, null, 2));
    return host;
  };
}



function updateTsConfig(options: InitOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const projectRoot = getProjectRoot(host, options, true);

    let filePath = 'tsconfig.base.json';
    if (!host.exists(filePath)) {
      filePath = 'tsconfig.json';
    }

    if (!host.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = host.read(filePath);
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

    const json = CJSON.parse(source.toString('utf-8'));

    json.compilerOptions = {
      ...json.compilerOptions,
      "paths": {
        "@app/*": [projectRoot + 'src/app/*'],
        "@env/*": [projectRoot + 'src/environments/*']
      }
    };

    host.overwrite(filePath, CJSON.stringify(json, null, 2));
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

    host.overwrite(filePath, content);
    return host;
  };
}


function updatePolyfills(options: InitOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const projectRoot = getProjectRoot(host, options);
    const filePath = path.join(projectRoot, 'src/polyfills.ts');
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

function updateKarmaTest(options: InitOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const projectRoot = getProjectRoot(host, options);

    const file = path.join(projectRoot, 'src/test.ts');
    if (host.exists(file)) {
      const source = host.read(file);
      if (!source)
        return host;

      let content = source.toString('utf-8');
      content += `${EOL}window[\`APP_MANIFEST\`] = {};${EOL}`;

      host.overwrite(file, content);
    }

    return host;
  };
}

function updateEnvironments(options: InitOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    const projectRoot = getProjectRoot(host, options);

    updateEnvironment(host, path.join(projectRoot, 'src/environments/environment.ts'));
    updateEnvironment(host, path.join(projectRoot, 'src/environments/environment.prod.ts'));
    return host;
  };
}

function updateEnvironment(host: Tree, file: string): void {
  if (!host.exists(file))
    return;

  const sourceFile = CodeUtils.readSourceFile(host, file);

  CodeUtils.insertInVariableObject(sourceFile, 'environment', `apiUrl: '/api/'`);
  CodeUtils.writeSourceFile(host, file, sourceFile);
}



function updateProjectWorkspace(options: InitOptions): (host: Tree) => Rule {
  return (host: Tree) => {
    return updateWorkspace(workspace => {
      const projectName = getProjectName(host, options);
      const project = workspace.projects.get(projectName);

      if (!project) {
        return;
      }

      workspace.extensions.cli = {
        'defaultCollection': 'yang-schematics'
      };

      let schematics: any = project.extensions.schematics;
      if (!schematics) {
        schematics = {};
        project.extensions['schematics'] = schematics;
      }

      const componentSchematic = schematics['@schematics/angular:component'];

      componentSchematic.inlineTemplate = componentSchematic.inlineTemplate ?? false;
      componentSchematic.inlineStyle = componentSchematic.inlineStyle ?? true;

      schematics['@schematics/angular:component'] = sortByKey(componentSchematic);

      const build = project.targets.get('build');
      if (!build) {
        throw new Error(`expected node projects/${projectName}/architect/build in angular.json`);
      }

      const test = project.targets.get('test');
      if (!test) {
        throw new Error(`expected node projects/${projectName}/architect/test in angular.json`);
      }

      const projectRoot = getProjectRoot(host, options, true);

      // Add stylePreprocessorOptions
      const stylePreprocessorOptions = {
        "includePaths": [
          projectRoot + 'src/styles'
        ]
      };

      (<any>build.options)['stylePreprocessorOptions'] = stylePreprocessorOptions;
      (<any>test.options)['stylePreprocessorOptions'] = stylePreprocessorOptions;


      // Add @angular-builders/custom-webpack
      build.builder = <any>'@angular-builders/custom-webpack:browser';
      (<any>build.options)['customWebpackConfig'] = {
        path: projectRoot +'webpack.config.js'
      };


      const serve = project.targets.get('serve');
      if (!serve) {
        throw new Error(`expected node projects/${projectName}/architect/serve in angular.json`);
      }

      serve.builder = <any>'@angular-builders/custom-webpack:dev-server';


      test.builder = <any>'@angular-builders/custom-webpack:karma';
      (<any>test.options)['customWebpackConfig'] = {
        path: projectRoot +'webpack.config.js'
      };
    });
  }
}
