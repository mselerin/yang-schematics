import { Schema as ComponentOptions } from './schema';
import {
    apply,
    chain,
    externalSchematic,
    filter,
    MergeStrategy,
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
import { Schema as NgComponentOptions } from '@schematics/angular/component/schema';
import { normalize, strings } from '@angular-devkit/core';
import * as path from 'path';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';

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

        const workspace = getWorkspace(host);
        const componentOptions: NgComponentOptions = {
            name: options.name,
            project: options.project || workspace.defaultProject,
            path: options.path,
            spec: options.spec,
            inlineStyle: (options.styles !== undefined ? !options.styles : undefined),
            inlineTemplate: (options.template !== undefined ? !options.template : undefined),
            flat: options.flat,
            styleext: 'scss',
            skipImport: true
        };


        return chain([
            externalSchematic('@schematics/angular', 'component', componentOptions),
            mergeWith(apply(url('./files'), [
                options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
                template({
                    ...strings,
                    'if-flat': (s: string) => options.flat ? '' : s,
                    ...options
                }),
                move(options.path)
            ]), MergeStrategy.Overwrite),

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

    if (options.route === undefined) {
        options.route = strings.dasherize(options.name);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    let compDir = `.`;
    if (!options.flat)
        compDir += `/${strings.dasherize(options.name)}`;

    CodeUtils.addImport(sourceFile,
        `${strings.classify(options.name)}Component`, `${compDir}/${strings.dasherize(options.name)}.component`);

    CodeUtils.insertInVariableArray(sourceFile, `${strings.classify(options.feature)}Routes`,
        `    { path: '${options.route}', component: ${strings.classify(options.name)}Component }`
    );

    host.overwrite(file, sourceFile.getFullText());
}
