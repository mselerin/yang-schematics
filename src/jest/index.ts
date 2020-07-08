import {Schema as JestOptions} from './schema';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url
} from '@angular-devkit/schematics';
import {getWorkspace, updateWorkspace} from '@schematics/angular/utility/config';
import {extraDevDependencies} from './dependencies';
import {installDeps, sortByKey} from '../utils/yang-utils';
import * as CJSON from 'comment-json';

export default function (options: JestOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      updatePackageJson(),
      updateTsConfig(),
      updateProjectWorkspace(),
      addJestFiles(),
      removeKarmaFiles(),
      installDeps(options.skipInstall)
    ])(host, context);
  };
}


function updatePackageJson(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const filePath = 'package.json';
    if (!tree.exists(filePath)) {
      throw new SchematicsException(`File ${filePath} does not exist.`);
    }

    const source = tree.read(filePath);
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

    const json = CJSON.parse(source.toString('utf-8'));

    json.scripts = {
      ...json.scripts,
      'test': 'jest',
      'test:watch': 'jest --watch'
    };

    // Add Jest dependencies
    json.devDependencies = {
      ...json.devDependencies,
      ...extraDevDependencies
    };

    // Remove Karma
    [
      'karma',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter'
    ].forEach(key => {
      delete json.devDependencies[key];
    });

    // Sort dependencies by name
    json.dependencies = sortByKey(json.dependencies);
    json.devDependencies = sortByKey(json.devDependencies);

    tree.overwrite(filePath, CJSON.stringify(json, null, 2));
    return tree;
  };
}


function updateTsConfig(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const filePath = 'tsconfig.spec.json';

    const source = tree.read(filePath);
    if (!source) {
      throw new SchematicsException(`File ${filePath} is empty.`);
    }

    const json = CJSON.parse(source.toString('utf-8'));

    json.compilerOptions = {
      ...json.compilerOptions,
      "emitDecoratorMetadata": true,
      "types": ["jest", "node"]
    };

    json.files = json.files.filter((f: string) => f !== 'src/test.ts');

    tree.overwrite(filePath, CJSON.stringify(json, null, 2));
    return tree;
  };
}


function updateProjectWorkspace(): (tree: Tree) => Rule {
  return (tree: Tree) => {
    const workspace = getWorkspace(tree);
    const project = workspace.defaultProject as string;

    const architect = workspace.projects[project].architect;
    if (!architect) throw new Error(`expected node projects/${project}/architect in angular.json`);

    // Add proxy config
    const test = architect.test;
    if (!test) throw new Error(`expected node projects/${project}/architect/test in angular.json`);

    (<any>test.builder) = '@angular-builders/jest:run';
    delete (<any>test.options)['main'];
    delete (<any>test.options)['polyfills'];
    delete (<any>test.options)['tsConfig'];
    delete (<any>test.options)['karmaConfig'];

    return updateWorkspace(workspace);
  }
}


function addJestFiles(): (tree: Tree) => Rule {
  return (tree: Tree) => {
    return mergeWith(apply(url('./files'), [
      move(''),
    ]), MergeStrategy.Overwrite);
  }
}


function removeKarmaFiles(): (tree: Tree) => Tree {
  return (tree: Tree) => {
    const deleteFiles = [
      './karma.conf.js',
      './src/test.ts'
    ];

    deleteFiles.forEach((filePath) => {
      if (tree.exists(filePath)) {
        tree.delete(filePath);
      }
    });

    return tree;
  }
}
