import { Schema as ServiceOptions } from './schema';
import { chain, externalSchematic, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';

export default function (options: ServiceOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            externalSchematic('@schematics/angular', 'ng-new', {
                name: options.name,
                path: './' + options.name,
                style: 'scss',
                inlineStyle: true,
                inlineTemplate: true,
                skipInstall: true
            }),

            schematic('init', {})
        ])(host, context);
    };
}
