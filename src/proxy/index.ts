import {Schema as ProxyOptions} from './schema';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import {getWorkspace, updateWorkspace} from '@schematics/angular/utility/config';

export default function (options: ProxyOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      mergeWith(apply(url('./files'), [
        move(''),
      ]), MergeStrategy.Overwrite),
      updateProjectWorkspace()
    ])(host, context);
  };
}


function updateProjectWorkspace(): (host: Tree) => Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = workspace.defaultProject as string;

    const architect = workspace.projects[project].architect;
    if (!architect) throw new Error(`expected node projects/${project}/architect in angular.json`);

    // Add proxy config
    const serve = architect.serve;
    if (!serve) throw new Error(`expected node projects/${project}/architect/serve in angular.json`);

    (<any>serve.options)['proxyConfig'] = 'proxy.conf.json';

    return updateWorkspace(workspace);
  }
}
