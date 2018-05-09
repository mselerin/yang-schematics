import { Schema as ComponentOptions } from './schema';
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
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import * as path from 'path';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

export default function (options: ComponentOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        // Smart detect if shared or feature_name
        if (options.name.includes('/')) {
            let nameArgs: string[] = options.name.split('/');
            let classifier: string = nameArgs.shift() as string;

            if ('shared' === classifier) {
                options.shared = true;
                options.feature = "";
                options.name = nameArgs.join('/');
            }

            else {
                // First argument is a feature name
                options.shared = false;
                options.feature = classifier;
                options.name = nameArgs.join('/');
            }
        }


        if (options.feature) {
            options.path = path.join('src', 'app', 'features', strings.dasherize(options.feature));
        }

        if (options.shared) {
            options.path = path.join('src', 'app', 'shared', 'components');
        }

        options.path = normalize(options.path);

        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
            options.styles ? noop() : filter(path => !path.endsWith('.scss')),
            options.template ? noop() : filter(path => !path.endsWith('.html')),
            template({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options
            }),
            move(options.path)
        ]);


        return chain([
            branchAndMerge(chain([
                mergeWith(templateSource),
                addNgModule(options)
            ]))
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
            let compDir = `.`;
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

            if (options.routing)
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
        `    { path: '${strings.dasherize(options.name)}', component: ${strings.classify(options.name)}Component }`
    );

    host.overwrite(file, sourceFile.getFullText());
}
