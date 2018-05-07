import {
    apply,
    branchAndMerge,
    chain, FileEntry, FileOperator, forEach, MergeStrategy,
    mergeWith, move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { normalize } from '@angular-devkit/core';
import * as path from "path";

const stringUtils = {classify};

export function generateApp(options: AppSchemaOptions): Rule {
    options.name = options.name || path.basename(process.cwd());

    options.path = options.path || "";
    options.path = normalize(options.path);

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


export interface AppSchemaOptions {
    name: string;
    path: string;
}
