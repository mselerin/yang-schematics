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

const stringUtils = {classify, dasherize};

export function generate(options: FeatureOptions): Rule {
    options.path = options.path || "src/app/features/" + dasherize(options.name);
    options.path = normalize(options.path);

    options.component = options.component === undefined ? false : options.component;
    options.template = options.template === undefined ? false : options.template;
    options.styles = options.styles === undefined ? false : options.styles;

    console.log(options);

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


export interface FeatureOptions {
    name: string;
    path: string;
    component: boolean;
    template: boolean;
    styles: boolean;
}
