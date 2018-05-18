import { Schema as ServiceOptions } from './schema';
import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';

export default function (options: ServiceOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        if (!options.project) {
            const workspace = getWorkspace(host);
            options.project = workspace.defaultProject;
        }

        if (!options.path) {
            options.path = 'src/app/core/services';
        }

        return chain([
            externalSchematic('@schematics/angular', 'service', options)
        ])(host, context);
    };
}
