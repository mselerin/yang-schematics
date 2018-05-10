import { Schema as FeatureOptions } from './schema';
import {
    apply,
    branchAndMerge,
    chain,
    mergeWith,
    move,
    noop,
    Rule,
    schematic,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

export default function (options: FeatureOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                ...options
            }),
            move(`src/app/features/${strings.dasherize(options.name)}`)
        ]);


        const createComp = options.component ? schematic('component', {
            name: options.name,
            feature: options.name,
            flat: true,
            template: options.template,
            styles: options.styles
        }) : noop();


        return chain([
            mergeWith(templateSource),
            createComp,
            updateRouting(options)
        ])(host, context);
    };
}


function updateRouting(options: FeatureOptions): (host: Tree) => Tree {
    return (host: Tree) => {
        // Ajouter la route
        const file = YangUtils.FEATURES_MODULE_FILE;
        const text = host.read(file);
        if (text === null) {
            throw new SchematicsException(`File ${file} does not exist.`);
        }

        const sourceText = text.toString('utf-8');
        const sourceFile = CodeUtils.getSourceFile(file, sourceText);

        CodeUtils.insertInVariableArray(sourceFile, "FEATURES_ROUTES",
            `    { path: '${strings.dasherize(options.name)}', loadChildren: '@app/features/${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.module#${strings.classify(options.name)}Module' }`
        );

        host.overwrite(file, sourceFile.getFullText());
        return host;
    };
}
