import {FileEntry, forEach, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';

export class YangUtils {
  static MAIN_FILE = '/src/main.ts';
  static CORE_MODULE_FILE = '/src/app/core/core.module.ts';
  static SHARED_MODULE_FILE = '/src/app/shared/shared.module.ts';
  static FEATURES_MODULE_FILE = '/src/app/features/features.module.ts';
  static ROUTING_MODULE_FILE = '/src/app/app-routing.module.ts';
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


export function getRootPath(host: Tree, options: any): string {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = workspace.defaultProject;
  }
  const project = workspace.projects[options.project as string];
  const projectDirName = project.projectType === 'application' ? 'app' : 'lib';

  return `/${project.root}/src/${projectDirName}`;
}


export function smartPath(rootPath: string, options: any, sharedSubFolder?: string): void {
  if (!sharedSubFolder)
    sharedSubFolder = 'modules';

  if (options.name.includes('/')) {
    let nameArgs: string[] = options.name.split('/');
    let classifier: string = nameArgs.shift() as string;
    options.name = nameArgs.pop() as string;

    if (!options.path) {
      if ('shared' === classifier)
        options.path = `${rootPath}/shared/${sharedSubFolder}/${nameArgs.join('/')}`;
      else
        options.path = `${rootPath}/features/${classifier}/${nameArgs.join('/')}`;
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
