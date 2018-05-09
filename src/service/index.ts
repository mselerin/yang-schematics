import { Schema as ServiceOptions } from './schema';
import {
    apply,
    branchAndMerge,
    chain,
    filter,
    mergeWith,
    move,
    noop,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export default function (options: ServiceOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            branchAndMerge(chain([
                mergeWith(apply(url('./files'), [
                    options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
                    template({
                        ...strings,
                        ...options
                    }),
                    move('src/app/core/services')
                ]))
            ]))
        ])(host, context);
    };
}
