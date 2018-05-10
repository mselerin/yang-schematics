import { Schema as ServiceOptions } from './schema';
import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export default function (options: ServiceOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            externalSchematic('@schematics/angular', 'service', {
                name: options.name,
                path: 'src/app/core/services',
                spec: options.spec,
                skipImport: true,
                flat: true
            })
        ])(host, context);
    };
}
