/**
 * The SharedModule should only contains modules, components, directives and pipes
 * that are shared across every features.
 *
 * Do NOT import too much modules here to prevent budgets errors.
 * Prefer importing external modules inside the features directly.
 */
import {NgModule} from '@angular/core';
import {BaseModule} from '@app/base.module';


const MODULES: any[] = [
  BaseModule
];

const DECLARATIONS: any[] = [
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  exports: [...MODULES, ...DECLARATIONS]
})
export class SharedModule {
}
