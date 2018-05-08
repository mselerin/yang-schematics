import { FileEntry, forEach, Rule, Tree } from '@angular-devkit/schematics';

export class YangUtils
{
    static MAIN_FILE = "src/main.ts";
    static CORE_MODULE_FILE = "src/app/core/core.module.ts";
    static SERVICE_MODULE_FILE = "src/app/core/core.services.ts";
    static SHARED_MODULE_FILE = "src/app/shared/shared.module.ts";
    static FEATURES_MODULE_FILE = "src/app/features/features.module.ts";
    static ROUTING_MODULE_FILE = "src/app/app-routing.module.ts";
}


export function forceOverwrite(host: Tree): Rule {
    return forEach((entry: FileEntry) => {
        if (host.exists(entry.path)) {
            host.overwrite(entry.path, "");
            host.overwrite(entry.path, entry.content);
        }

        return entry;
    });
}
