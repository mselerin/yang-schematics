import { Schema as ComponentOptions } from './schema';
import {
    apply,
    branchAndMerge,
    chain,
    FileEntry,
    forEach,
    mergeWith, move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import * as path from 'path';

export default function (options: ComponentOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        if (options.feature) {
            options.path = path.join('src', 'app', 'features', strings.dasherize(options.feature));
            if (!options.flat)
                options.path = path.join(options.path, strings.dasherize(options.name));
        }

        if (options.shared) {
            options.path = path.join('src', 'app', 'shared', 'components');
            if (!options.flat)
                options.path = path.join(options.path, strings.dasherize(options.name));
        }

        options.path = normalize(options.path);

        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options
            }),
            forEach((entry: FileEntry) => {
                if (host.exists(entry.path))
                    host.delete(entry.path);

                return entry;
            }),
            move(options.path)
        ]);


        return chain([
            mergeWith(templateSource)

            // TODO Update routing
            // TODO Update feature / shared module
        ])(host, context);
    };
}
