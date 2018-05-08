import { Schema as FeatureOptions } from './schema';
import {
    apply,
    branchAndMerge,
    chain,
    FileEntry,
    forEach,
    mergeWith, noop,
    Rule, schematic,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from '@angular-devkit/core';

const stringUtils = {classify, dasherize};

export default function (options: FeatureOptions): Rule {
    options.path = options.path || "src/app/features/" + dasherize(options.name);
    options.path = normalize(options.path);

    options.component = options.component === undefined ? false : options.component;
    options.template = options.template === undefined ? false : options.template;
    options.styles = options.styles === undefined ? false : options.styles;

    console.log('feature', options);

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

        const createComp = options.component ? schematic('component', options) : noop();

        return chain([
            createComp,
            branchAndMerge(chain([
                mergeWith(templateSource)
            ]))
        ])(host, context);
    };
}
