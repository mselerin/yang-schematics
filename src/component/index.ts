import { Schema as ComponentOptions } from './schema';
import {
    apply,
    branchAndMerge,
    chain,
    FileEntry,
    forEach,
    mergeWith,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from '@angular-devkit/core';
import * as path from 'path';

const stringUtils = {classify, dasherize};

export default function (options: ComponentOptions): Rule {
    options.shared = options.shared === undefined ? false : options.shared;
    options.flat = options.flat === undefined ? false : options.flat;
    options.spec = options.spec === undefined ? false : options.spec;
    options.styles = options.styles === undefined ? false : options.styles;
    options.template = options.template === undefined ? false : options.template;
    options.routing = options.routing === undefined ? false : options.routing;

    if (options.feature) {
        options.path = path.join('src', 'app', 'features', dasherize(options.feature));
        if (!options.flat)
            options.path = path.join(options.path, dasherize(options.name));
    }

    if (options.shared) {
        options.path = path.join('src', 'app', 'shared', 'components');
        if (!options.flat)
            options.path = path.join(options.path, dasherize(options.name));
    }

    options.path = normalize(options.path);


    console.log('component', options);

    return (host: Tree, context: SchematicContext) => {
        const templateSource = apply(url('./files'), [
            template({
                ...stringUtils,
                ...options
            }),
            forEach((entry: FileEntry) => {
                if (host.exists(entry.path))
                    host.delete(entry.path);

                return entry;
            })
        ]);


        return chain([
            branchAndMerge(chain([
                mergeWith(templateSource)
            ]))
        ])(host, context);
    };
}
