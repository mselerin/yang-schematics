import {Schema as ModuleOptions} from './schema';
import {apply, chain, filter, mergeWith, move, noop, Rule, schematic, template, Tree, url} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {CodeUtils} from '../utils/code-utils';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {parseName} from '@schematics/angular/utility/parse-name';
import {findClosestModule, getSourceRoot, smartPath} from '../utils/yang-utils';

export default function (options: ModuleOptions): Rule {
  return (host: Tree) => {
    const rootPath = getSourceRoot(host, options);
    smartPath(rootPath, options, '');

    if (!options.path) {
      options.path = `${rootPath}/shared`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findClosestModule(host, options, 'shared');

    const templateSource = apply(url('./files'), [
      options.routing ? noop() : filter(path => !path.endsWith('-routing.module.ts')),
      template({
        ...strings,
        'if-flat': (s: string) => options.flat ? '' : s,
        ...options
      }),
      move(options.path)
    ]);

    const createComp = options.component ? schematic('component', {
      project: options.project,
      name: options.name,
      path: options.path + '/' + options.name,
      routing: true,
      route: ''
    }) : noop();

    return chain([
      mergeWith(templateSource),
      createComp,
      addNgModule(options)
    ]);
  };
}


function addNgModule(options: ModuleOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (!options.module)
      return host;

    const file = options.module;
    const sourceFile = CodeUtils.readSourceFile(host, file);

    const modulePath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.module';

    const relativePath = buildRelativePath(options.module, modulePath);

    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Module`, relativePath);
    CodeUtils.insertInVariableArray(sourceFile, "MODULES", `${strings.classify(options.name)}Module`);

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
