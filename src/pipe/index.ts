import { Schema as PipeOptions } from './schema';
import {
    apply,
    branchAndMerge,
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
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { CodeUtils } from '../utils/code-utils';

export default function (options: PipeOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            branchAndMerge(chain([
                mergeWith(apply(url('./files'), [
                    template({
                        ...strings,
                        ...options
                    }),
                    move('src/app/shared/pipes')
                ])),

                addNgModule(options)
            ]))
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
