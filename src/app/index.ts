import { Schema as AppOptions } from './schema';
import {
    apply,
    chain, FileEntry, forEach,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from '@angular-devkit/core';
import * as path from "path";
import { getWorkspace } from '@schematics/angular/utility/config';

const stringUtils = {classify, dasherize};

export default function (options: AppOptions): Rule {
    return (host: Tree, context: SchematicContext) => {

        options.name = options.name || path.basename(process.cwd());
        if (!options.name) {
            throw new SchematicsException(`Invalid options, "name" is required.`);
        }

        const workspace = getWorkspace(host);
        let defaultProject = workspace.defaultProject as string;
        let root = workspace.projects[defaultProject].root;

        console.log('root', root);

        options.path = options.path || "";
        options.path = normalize(options.path);

        console.log('app', options);

        const templateSource = apply(url('./files'), [
            template({
                ...stringUtils,
                ...options
            }),
            forEach((entry: FileEntry) => {
                if (host.exists(entry.path)) {
                    host.overwrite(entry.path, new Buffer(""));
                    host.overwrite(entry.path, entry.content);
                }

                return entry;
            }),
            move(root)
        ]);


        return chain([
            mergeWith(templateSource)
        ])(host, context);
    };
}
