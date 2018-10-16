import { Schema as ModuleOptions } from './schema';
import {
  apply,
  chain,
  filter, mergeWith, move, noop,
  Rule,
  SchematicContext,
  SchematicsException, template,
  Tree, url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { CodeUtils } from '../utils/code-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { getRootPath, smartPath } from '../utils/yang-utils';

export default function (options: ModuleOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getRootPath(host, options);
    smartPath(rootPath, options);

    if (!options.path) {
      options.path = `${rootPath}/shared/modules`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findModuleFromOptions(host, options);

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        'if-flat': (s: string) => options.flat ? '' : s,
        ...options
      }),
      move(options.path)
    ]);

    return chain([
      mergeWith(templateSource),
      addNgModule(options)
    ])(host, context);
  };
}


function addNgModule(options: ModuleOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (!options.module)
      return host;

    const file = options.module;
    const text = host.read(file);
    if (text === null) {
      throw new SchematicsException(`File ${file} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    const sourceFile = CodeUtils.getSourceFile(file, sourceText);

    const modulePath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.module';

    const relativePath = buildRelativePath(options.module, modulePath);

    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Module`, relativePath);
    CodeUtils.insertInVariableArray(sourceFile, "MODULES", `   ${strings.classify(options.name)}Module`);

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
