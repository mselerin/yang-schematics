import { Schema as ComponentOptions } from './schema';
import {
    apply, branchAndMerge,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import * as path from 'path';
import { forceOverwrite, YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

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
            move(options.path),
            forceOverwrite(host)
        ]);


        return chain([
            mergeWith(templateSource),
            addNgModule(options)
        ])(host, context);
    };
}




function addNgModule(options: ComponentOptions): (host: Tree) => Tree {
    return (host: Tree) => {
        if (options.shared) {
            let compDir = `./components`;
            if (!options.flat)
                compDir += `/${strings.dasherize(options.name)}`;

            const file = YangUtils.SHARED_MODULE_FILE;
            const text = host.read(file);
            if (text === null) {
                throw new SchematicsException(`File ${file} does not exist.`);
            }

            const sourceText = text.toString('utf-8');
            const sourceFile = CodeUtils.getSourceFile(file, sourceText);

            CodeUtils.addImport(sourceFile,
                `${strings.classify(options.name)}Component`, `${compDir}/${strings.dasherize(options.name)}.component`);

            CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Component`);
            host.overwrite(file, sourceFile.getFullText());
        }


        else if (options.feature) {
            let compDir = `./components`;
            if (!options.flat)
                compDir += `/${strings.dasherize(options.name)}`;

            const file = `src/app/features/${strings.dasherize(options.feature)}/${strings.dasherize(options.feature)}.module.ts`;
            const text = host.read(file);
            if (text === null) {
                throw new SchematicsException(`File ${file} does not exist.`);
            }

            const sourceText = text.toString('utf-8');
            const sourceFile = CodeUtils.getSourceFile(file, sourceText);

            CodeUtils.addImport(sourceFile,
                `${strings.classify(options.name)}Component`, `${compDir}/${strings.dasherize(options.name)}.component`);

            CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Component`);
            host.overwrite(file, sourceFile.getFullText());

            updateFeatureRouting(options, host);
        }

        return host;
    };
}

function updateFeatureRouting(options: ComponentOptions, host: Tree): void {
    // Ajouter la route
    const file = `src/app/features/${strings.dasherize(options.feature)}/${strings.dasherize(options.feature)}-routing.module.ts`;
    const text = host.read(file);
    if (text === null) {
        throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    let compDir = `.`;
    if (!options.flat)
        compDir += `/${strings.dasherize(options.name)}`;

    CodeUtils.addImport(sourceFile,
        `${strings.classify(options.name)}Component`, `${compDir}/${strings.dasherize(options.name)}.component`);

    CodeUtils.insertInVariableArray(sourceFile, `${strings.classify(options.feature)}Routes`,
        `    { path: '${strings.dasherize(options.name)}', component: '${strings.classify(options.name)}Component' }`
    );

    host.overwrite(file, sourceFile.getFullText());
}
