import {Path} from '@angular-devkit/core';
import {FileEntry, forEach, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {findModuleFromOptions, ModuleOptions} from '@schematics/angular/utility/find-module';

export class YangUtils {
  static MAIN_FILE = '/src/main.ts';
  static CORE_MODULE_FILE = '/src/app/core/core.module.ts';
  static SHARED_MODULE_FILE = '/src/app/shared/shared.module.ts';
  static FEATURES_MODULE_FILE = '/src/app/features/features.module.ts';
  static ROUTING_MODULE_FILE = '/src/app/app-routing.module.ts';
}

export interface PathOptions {
  project?: string;
  module?: string;
  name: string;
  flat?: boolean;
  path?: string;
}

export function forceOverwrite(host: Tree): Rule {
  return forEach((entry: FileEntry) => {
    if (host.exists(entry.path)) {
      host.overwrite(entry.path, Buffer.from(''));
      host.overwrite(entry.path, Buffer.from(entry.content));
    }

    return entry;
  });
}


export function getProjectName(host: Tree, options: any): string {
  return options.project ?? getWorkspace(host).defaultProject;
}

export function getProjectRoot(host: Tree, options: any, suffix = false): string {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = workspace.defaultProject;
  }

  const project = workspace.projects[options.project as string];
  let projectRoot = project.root ?? '';

  if (suffix && projectRoot) {
    projectRoot += '/';
  }

  return projectRoot;
}


export function getSourceRoot(host: Tree, options: PathOptions): string {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = workspace.defaultProject;
  }
  const project = workspace.projects[options.project as string];
  const projectDirName = project.projectType === 'application' ? 'app' : 'lib';

  return `/${project.root}/src/${projectDirName}`;
}


export function smartPath(rootPath: string, options: PathOptions, sharedSubFolder: string): void {
  if (options.path) {
    return;
  }

  if (!options.name.includes('/')) {
    return;
  }

  const nameArgs: string[] = options.name.split('/');
  const classifier: string = nameArgs.shift() as string;
  options.name = nameArgs.pop() as string;

  if ('shared' === classifier) {
    if (sharedSubFolder && nameArgs.length === 0) {
      nameArgs.unshift(sharedSubFolder);
    }

    nameArgs.unshift('shared');
  }
  else {
    nameArgs.unshift('features', classifier);
  }

  options.path = `${rootPath}/${nameArgs.join('/')}`;
}


export function findClosestModule(host: Tree, options: ModuleOptions, defaultModule?: string): Path | undefined {
  try {
    return findModuleFromOptions(host, options);
  }
  catch (err) {
    if (!options.module) {
      const opt = {...options, module: defaultModule};
      return findModuleFromOptions(host, opt);
    }
    else {
      throw err;
    }
  }
}


export function sortByKey(unsorted: any): any {
  const ordered: any = {};
  Object.keys(unsorted).sort().forEach((key) => {
    ordered[key] = unsorted[key];
  });

  return ordered;
}


export function installDeps(skipInstall?: boolean): (host: Tree, context: SchematicContext) => void {
  return (host: Tree, context: SchematicContext) => {
    if (!skipInstall)
      context.addTask(new NodePackageInstallTask());
  };
}
