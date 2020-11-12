import {Schema as ProxyOptions} from './schema';
import {apply, chain, MergeStrategy, mergeWith, move, Rule, url} from '@angular-devkit/schematics';
import {updateWorkspace} from '@schematics/angular/utility/workspace';

export default function (options: ProxyOptions): Rule {
  return () => {
    return chain([
      mergeWith(apply(url('./files'), [
        move(''),
      ]), MergeStrategy.Overwrite),
      updateProjectWorkspace()
    ]);
  };
}


function updateProjectWorkspace(): () => Rule {
  return () => {
    return updateWorkspace(workspace => {
      const projectName = workspace.extensions.defaultProject as string;
      const project = workspace.projects.get(projectName);

      if (!project) {
        return;
      }

      // Add proxy config
      const serve = project.targets.get('serve');
      if (!serve) throw new Error(`expected node projects/${projectName}/architect/serve in angular.json`);

      (<any>serve.options)['proxyConfig'] = 'proxy.conf.json';
    });
  }
}
