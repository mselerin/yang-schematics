import {StringUtils} from "./string-utils";
import { ImportDeclarationStructure, SourceFile } from "ts-simple-ast";
import TsSimpleAst from "ts-simple-ast";

export class CodeUtils
{
    static getSourceFile(file: string, content: string): SourceFile {
        let ast = new TsSimpleAst({ useVirtualFileSystem: true });

        let sourceFile = ast.getSourceFile(file);
        if (!sourceFile) {
            sourceFile = ast.createSourceFile(file, content);
        }

        return sourceFile;
    }


    static extractArrayFromObject(block: string, arrName: string): string
    {
        let ndxStart = block.indexOf(arrName);
        if (ndxStart >= 0) {
            let ndxEnd = block.indexOf(']', ndxStart + 1);
            return block.substring(ndxStart, ndxEnd + 1);
        }

        return "";
    }


    static replaceArrayInObject(block: string, arrName: string, arrStr: string): string
    {
        let ndxStart = block.indexOf(arrName);
        if (ndxStart >= 0) {
            let ndxEnd = block.indexOf(']', ndxStart + 1);
            return [block.slice(0, ndxStart), arrStr, block.slice(ndxEnd+1)].join('');
        }

        return block;
    }


    static insertInVariableArray(sourceFile: SourceFile, variableName: string, str: string): void
    {
        let varDeclaration = sourceFile.getVariableDeclaration(variableName);
        if (!varDeclaration) {
            throw new Error(`Cannot find variable '${variableName}' in file '${sourceFile.getFilePath()}'`);
        }

        let block = varDeclaration.getText();
        block = CodeUtils.insertInArray(block, str);

        varDeclaration.replaceWithText(block);
    }


    static insertInArray(block: string, str: string): string
    {
        let startArr = block.indexOf('[');
        let endArr = block.lastIndexOf(']');

        let arrStr = block.substring(startArr, endArr + 1);

        // Retrouver le dernier caractère
        let startNdx = StringUtils.findLast(arrStr, /[a-z0-9\}\)]/i);
        let comma = "";

        if (startNdx < 0) {
            startNdx = 1;
        }
        else {
            startNdx++;
            comma = ',';
        }

        arrStr = [arrStr.slice(0, startNdx), `${comma}\r\n${str}`, arrStr.slice(startNdx)].join('');
        return [block.slice(0, startArr), arrStr, block.slice(endArr+1)].join('');
    }


    static addImport(sourceFile: SourceFile, importName: string, importFile: string) {
        if (importName.includes(" as ")) {
            sourceFile.addImportDeclaration({
                defaultImport: importName,
                moduleSpecifier: importFile
            });
        }
        else {
            sourceFile.addImportDeclaration({
                namedImports: [{name: importName}],
                moduleSpecifier: importFile
            });
        }
    }
}
