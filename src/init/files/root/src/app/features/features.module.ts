import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const FEATURES_ROUTES: Routes = [
];


const MODULES: any[] = [
];


@NgModule({
  imports: [
    ...MODULES,
    RouterModule.forChild(FEATURES_ROUTES)
  ],
  exports: MODULES
})
export class FeaturesModule {}
