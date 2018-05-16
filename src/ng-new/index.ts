import { Schema as YangNewOptions } from './schema';
import {
    apply,
    chain, empty, externalSchematic,
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
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { Schema as YangInitOptions } from '../init/schema';
import {
    NodePackageInstallTask,
    NodePackageLinkTask,
    RepositoryInitializerTask
} from '@angular-devkit/schematics/tasks';

export default function (options: YangNewOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        if (!options.name) {
            throw new SchematicsException(`Invalid options, "name" is required.`);
        }

        if (!options.directory) {
            options.directory = options.name;
        }

        const workspaceOptions: WorkspaceOptions = {
            name: options.name,
            version: options.version,
            newProjectRoot: options.newProjectRoot || 'projects',
        };

        const applicationOptions: ApplicationOptions = {
            projectRoot: '',
            name: options.name,
            inlineStyle: true,
            inlineTemplate: true,
            prefix: options.prefix,
            viewEncapsulation: options.viewEncapsulation,
            routing: options.routing,
            style: options.style,
            skipTests: options.skipTests,
            skipPackageJson: false,
        };

        const yangInitOptions: YangInitOptions = {
            name: options.name
        };

        return chain([
            mergeWith(
                apply(empty(), [
                    externalSchematic('@schematics/angular', 'workspace', workspaceOptions),
                    externalSchematic('@schematics/angular', 'application', applicationOptions),
                    schematic('init', yangInitOptions),
                    move(options.directory || options.name),
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
