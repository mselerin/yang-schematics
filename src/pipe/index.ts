import {Schema as PipeOptions} from './schema';
import {chain, externalSchematic, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {CodeUtils} from '../utils/code-utils';
import {parseName} from '@schematics/angular/utility/parse-name';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {findClosestModule, getProjectSchematic, getSourceRoot, smartPath} from '../utils/yang-utils';

export default function (options: PipeOptions): Rule {
  return async (host: Tree) => {
    const rootPath = getSourceRoot(host, options);
    smartPath(rootPath, options, 'pipes');

    if (!options.path) {
      options.path = `${rootPath}/shared/pipes`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.module = findClosestModule(host, options, 'shared');

    const schematic = await getProjectSchematic(host, options, '@schematics/angular:pipe');
    options.skipTests = options.skipTests ?? schematic.skipTests ?? false;
    options.flat = options.flat ?? schematic.flat ?? true;

    const ngOptions = {
      ...options,
      skipImport: true
    };

    return chain([
      externalSchematic('@schematics/angular', 'pipe', ngOptions),
      addNgModule(options)
    ]);
  };
}


function addNgModule(options: PipeOptions): (host: Tree) => Tree {
  return (host: Tree) => {
    if (options.skipImport || !options.module)
      return host;

    const file = options.module;
    const sourceFile = CodeUtils.readSourceFile(host, file);

    const pipePath = `/${options.path}/`
      + (options.flat ? '' : strings.dasherize(options.name) + '/')
      + strings.dasherize(options.name)
      + '.pipe';

    const relativePath = buildRelativePath(options.module, pipePath);

    CodeUtils.addImport(sourceFile, `${strings.classify(options.name)}Pipe`, relativePath);
    CodeUtils.insertInVariableArray(sourceFile, "DECLARATIONS", `${strings.classify(options.name)}Pipe`);

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
