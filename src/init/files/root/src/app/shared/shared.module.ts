/**
 * The SharedModule should only contains modules, components, directives and pipes
 * that are shared across every modules & features.
 *
 * Do NOT import too much modules here to prevent big vendor.js files.
 * Prefer importing external modules inside the features directly.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


const MODULES: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
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
