import {Schema as ServiceOptions} from './schema';
import {chain, externalSchematic, Rule, Tree} from '@angular-devkit/schematics';
import {parseName} from '@schematics/angular/utility/parse-name';
import {getProjectSchematic, getSourceRoot} from '../utils/yang-utils';

export default function (options: ServiceOptions): Rule {
  return async (host: Tree) => {
    const rootPath = getSourceRoot(host, options);

    if (!options.path) {
      options.path = `${rootPath}/services`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const schematic = await getProjectSchematic(host, options, '@schematics/angular:service');
    options.flat = options.flat ?? schematic.flat ?? true;
    options.skipTests = options.skipTests ?? schematic.skipTests ?? false;

    return chain([
      externalSchematic('@schematics/angular', 'service', options)
    ]);
  };
}
