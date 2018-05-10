import { Schema as PipeOptions } from './schema';
import {
    chain,
    externalSchematic,
    Rule,
    SchematicContext,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

export default function (options: PipeOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            externalSchematic('@schematics/angular', 'pipe', {
                name: options.name,
                path: 'src/app/shared/pipes',
                spec: options.spec,
                skipImport: true,
                flat: true
            }),

            addNgModule(options)
        ])(host, context);
    };
}


function addNgModule(options: PipeOptions): (host: Tree) => Tree {
    return (host: Tree) => {
        const file = YangUtils.SHARED_MODULE_FILE;
        const text = host.read(file);
        if (text === null) {
            throw new SchematicsException(`File ${file} does not exist.`);
        }

        const sourceText = text.toString('utf-8');
        const sourceFile = CodeUtils.getSourceFile(file, sourceText);

        CodeUtils.addImport(sourceFile,
            `${strings.classify(options.name)}Pipe`, `./pipes/${strings.dasherize(options.name)}.pipe`);

        CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `   ${strings.classify(options.name)}Pipe`);
        host.overwrite(file, sourceFile.getFullText());

        return host;
    };
}
