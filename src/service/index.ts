import { Schema as ServiceOptions } from './schema';
import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { getRootPath } from '../utils/yang-utils';

export default function (options: ServiceOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getRootPath(host, options);

    if (!options.path) {
      options.path = `${rootPath}/services`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    return chain([
      externalSchematic('@schematics/angular', 'service', options)
    ])(host, context);
  };
}
