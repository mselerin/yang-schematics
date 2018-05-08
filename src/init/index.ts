import { Schema as AppOptions } from './schema';
import {
    apply,
    chain, FileEntry, forEach,
    mergeWith,
    move,
    Rule, schematic,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import * as path from "path";
import { getWorkspace } from '@schematics/angular/utility/config';
import { EOL } from "os";

export default function (options: AppOptions): Rule {
    return (host: Tree, context: SchematicContext) => {

        options.name = options.name || path.basename(process.cwd());
        if (!options.name) {
            throw new SchematicsException(`Invalid options, "name" is required.`);
        }

        options.path = options.path || "";
        options.path = normalize(options.path);

        const workspace = getWorkspace(host);
        let defaultProject = workspace.defaultProject as string;
        let root = workspace.projects[defaultProject].root;

        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                ...options
            }),
            forEach((entry: FileEntry) => {
                if (host.exists(entry.path)) {
                    host.overwrite(entry.path, new Buffer(""));
                    host.overwrite(entry.path, entry.content);
                }

                return entry;
            }),
            move(root)
        ]);


        return chain([
            mergeWith(templateSource),
            updatePackageJson(),
            updateTsConfig(),
            updateGitIgnore(),
            updatePolyfills(),

            schematic('feature', {
                name: 'home',
                component: true
            })

            // TODO Update 'home' feature
        ])(host, context);
    };
}



function updatePackageJson(): (host: Tree) => Tree {
    return (host: Tree) => {
        const filePath = 'package.json';
        if (!host.exists(filePath))
            return host;

        const source = host.read(filePath);
        if (!source)
            return host;

        const json = JSON.parse(source.toString('utf-8'));

        json.scripts = {
            ...json.scripts,
            "prebuild": "node prebuild.js",
            "prestart": "node prebuild.js"
        };

        json.dependencies = {
            ...json.dependencies,
            "whatwg-fetch": "2.0.4",
            "@ngx-translate/core": "10.0.1",
            "rxjs-compat": "6.1.0"
        };

        // Remove ^ and ~ dependencies
        fixDepsVersions(json.dependencies);
        fixDepsVersions(json.devDependencies);

        host.overwrite(filePath, JSON.stringify(json, null, 2));
        return host;
    };
}


function fixDepsVersions(deps: any): void {
    for (let key in deps) {
        let value: string = deps[key];
        if (value.startsWith('^') || value.startsWith('~'))
            value = value.substring(1);

        deps[key] = value;
    }
}


function updateTsConfig(): (host: Tree) => Tree {
    return (host: Tree) => {
        const filePath = 'tsconfig.json';
        if (!host.exists(filePath))
            return host;

        const source = host.read(filePath);
        if (!source)
            return host;

        const json = JSON.parse(source.toString('utf-8'));

        json.compilerOptions = {
            ...json.compilerOptions,
            "paths": {
                "@app/*": ["src/app/*"],
                "@env/*": ["src/environments/*"]
            }
        };

        host.overwrite(filePath, JSON.stringify(json, null, 2));
        return host;
    };
}


function updateGitIgnore(): (host: Tree) => Tree {
    return (host: Tree) => {
        const filePath = '.gitignore';
        if (!host.exists(filePath))
            return host;

        const source = host.read(filePath);
        if (!source)
            return host;

        let content = source.toString('utf-8');
        content += `${EOL}# Custom Files${EOL}`;
        content += `*.iml${EOL}`;
        content += `/src/assets/app-manifest.json${EOL}`;

        host.overwrite(filePath, content);
        return host;
    };
}

function updatePolyfills(): (host: Tree) => Tree {
    return (host: Tree) => {
        const filePath = 'src/polyfills.ts';
        if (!host.exists(filePath))
            return host;

        const source = host.read(filePath);
        if (!source)
            return host;

        let content = source.toString('utf-8');
        content += `import 'whatwg-fetch';${EOL}`;

        host.overwrite(filePath, content);
        return host;
    };
}
