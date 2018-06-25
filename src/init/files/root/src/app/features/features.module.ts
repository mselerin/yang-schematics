import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LayoutModule } from './layout/layout.module';

const MODULES: any[] = [
  LayoutModule
];


export const FEATURES_ROUTES: Routes = [];


@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class FeaturesModule {
}
