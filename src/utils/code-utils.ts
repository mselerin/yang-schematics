import {SchematicsException, Tree} from '@angular-devkit/schematics';
import {Project, QuoteKind, SourceFile, VariableDeclaration} from 'ts-morph';
import {StringUtils} from './string-utils';

export class CodeUtils {
  static readSourceFile(host: Tree, file: string): SourceFile {
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    return CodeUtils.getSourceFile(file, sourceText);
  }

  static writeSourceFile(host: Tree, file: string, sourceFile: SourceFile): void {
    host.overwrite(file, sourceFile.getFullText());
  }


  static formatText(block: any): void {
    block.formatText({
      indentSize: 2
    });
  }


  static getSourceFile(file: string, content: string): SourceFile {
    const project = new Project({
      useInMemoryFileSystem: true,
      manipulationSettings: {
        quoteKind: QuoteKind.Single
      }
    });

    project.createSourceFile(file, content);

    let sourceFile = project.getSourceFile(file);
    if (!sourceFile) {
      sourceFile = project.createSourceFile(file, content);
    }

    return sourceFile;
  }


  static getVariableDeclaration(sourceFile: SourceFile, variableName: string): VariableDeclaration {
    let varDeclaration = sourceFile.getVariableDeclaration(variableName);
    if (!varDeclaration) {
      throw new Error(`Cannot find variable '${variableName}' in file '${sourceFile.getFilePath()}'`);
    }

    return varDeclaration;
  }


  static insertInVariableArray(sourceFile: SourceFile, variableName: string, str: string): void {
    let varDeclaration = CodeUtils.getVariableDeclaration(sourceFile, variableName);
    let block = varDeclaration.getText();
    block = CodeUtils.insertInArray(block, str);

    varDeclaration.replaceWithText(block);
    CodeUtils.formatText(CodeUtils.getVariableDeclaration(sourceFile, variableName));
  }

  static insertInVariableObject(sourceFile: SourceFile, variableName: string, str: string): void {
    let varDeclaration = CodeUtils.getVariableDeclaration(sourceFile, variableName);
    let block = varDeclaration.getText();
    block = CodeUtils.insertInObject(block, str);

    varDeclaration.replaceWithText(block);
    CodeUtils.formatText(CodeUtils.getVariableDeclaration(sourceFile, variableName));
  }


  static insertInArray(block: string, str: string): string {
    return CodeUtils.insertInBlock(block, str, '[', ']');
  }


  static insertInObject(block: string, str: string): string {
    return CodeUtils.insertInBlock(block, str, '{', '}');
  }


  private static insertInBlock(block: string, str: string, startDelimiter: string, endDelimiter: string): string {
    let startObj = block.lastIndexOf(startDelimiter);
    let endObj = block.lastIndexOf(endDelimiter);
    let objStr = block.substring(startObj, endObj + 1);

    // Retrouver le dernier caractère
    let startNdx = StringUtils.findLast(objStr.substr(0, objStr.length - 1), /[a-z0-9\}\)]/i);
    let comma = "";

    if (startNdx < 0) {
      startNdx = 1;
    }
    else {
      startNdx++;
      comma = ',';
    }

    objStr = [objStr.slice(0, startNdx), `${comma}\r\n${str}`, objStr.slice(startNdx)].join('');
    return [block.slice(0, startObj), objStr, block.slice(endObj + 1)].join('');
  }


  static addImport(sourceFile: SourceFile, importName: string, importFile: string) {
    if (!importName) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: importFile
      });
    }
    else if (importName.includes(" as ")) {
      if (importName.startsWith('*')) {
        sourceFile.addImportDeclaration({
          defaultImport: importName,
          moduleSpecifier: importFile
        });
      }
      else {
        sourceFile.addImportDeclaration({
          namedImports: [importName],
          moduleSpecifier: importFile
        });
      }
    }
    else {
      sourceFile.addImportDeclaration({
        namedImports: [{name: importName}],
        moduleSpecifier: importFile
      });
    }
  }
}
