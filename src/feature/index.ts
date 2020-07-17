import {Schema as FeatureOptions} from './schema';
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {findClosestModule, getSourceRoot, YangUtils} from '../utils/yang-utils';
import {CodeUtils} from '../utils/code-utils';
import {parseName} from '@schematics/angular/utility/parse-name';

export default function (options: FeatureOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const rootPath = getSourceRoot(host, options);
    let originalName = options.name;

    if (options.name.includes('/')) {
      let nameArgs: string[] = options.name.split('/');

      options.name = nameArgs.pop() as string;
      options.path = nameArgs.join('/');
    }

    options.path = `${rootPath}/features/${options.path || ''}/${strings.dasherize(options.name)}`;

    const parsedPath = parseName(options.path, options.name);
    options.path = parsedPath.path;

    options.module = findClosestModule(host, options);


    const templateSource = apply(url('./files'), [
      options.skipTests ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options
      }),
      move(options.path)
    ]);

    const createComp = options.component ? schematic('component', {
      project: options.project,
      name: options.name,
      path: options.path,
      routing: true,
      route: '',
      flat: true,
      style: options.style,
      inlineStyle: options.inlineStyle,
      inlineTemplate: options.inlineTemplate
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
    if (!options.module)
      return host;

    let file = '';
    let varName = '';

    if (options.module.endsWith(YangUtils.FEATURES_MODULE_FILE)) {
      file = options.module;
      varName = 'FEATURES_ROUTES';
    }
    else {
      file = options.module.replace('.module.ts', '-routing.module.ts');
      varName = 'ROUTES';
    }

    // Ajouter la route
    const sourceFile = CodeUtils.readSourceFile(host, file);
    let routePath = (options.path || '').replace('/src/app/', '@app/');
    routePath = routePath.substring(routePath.indexOf('@app/'));

    CodeUtils.insertInVariableArray(sourceFile, varName,
      `{ path: '${strings.dasherize(options.name)}', loadChildren: () => import('${routePath}/${strings.dasherize(options.name)}.module').then(m => m.${strings.classify(options.name)}Module) }`
    );

    CodeUtils.writeSourceFile(host, file, sourceFile);
    return host;
  };
}
