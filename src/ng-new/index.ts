import {Schema as YangNewOptions} from './schema';
import {
  apply,
  chain,
  empty,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {Schema as NgNewOptions} from '@schematics/angular/ng-new/schema';
import {Schema as YangInitOptions} from '../init/schema';
import {NodePackageInstallTask, NodePackageLinkTask, RepositoryInitializerTask} from '@angular-devkit/schematics/tasks';

export default function (options: YangNewOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    if (!options.directory || options.directory === '/') {
      options.directory = options.name;
    }

    const ngNewOptions: NgNewOptions = {
      ...options,
      directory: '/',
      skipInstall: true,
      skipGit: true,
      inlineStyle: options.inlineStyle ?? true,
      inlineTemplate: options.inlineTemplate ?? false
    };

    const yangInitOptions: YangInitOptions = {
      name: options.name
    };

    return chain([
      mergeWith(
        apply(empty(), [
          externalSchematic('@schematics/angular', 'ng-new', ngNewOptions),
          schematic('init', yangInitOptions),
          move(options.directory),
        ]), MergeStrategy.Overwrite
      ),
      (host: Tree, context: SchematicContext) => {
        let packageTask;
        if (!options.skipInstall) {
          packageTask = context.addTask(new NodePackageInstallTask(options.directory));
          if (options.linkCli) {
            packageTask = context.addTask(
              new NodePackageLinkTask('@angular/cli', options.directory),
              [packageTask],
            );
          }
        }
        if (!options.skipGit) {
          const commit = typeof options.commit == 'object'
            ? options.commit
            : (!!options.commit ? {} : false);

          context.addTask(
            new RepositoryInitializerTask(
              options.directory,
              commit,
            ),
            packageTask ? [packageTask] : [],
          );
        }
      }
    ])(host, context);
  };
}
