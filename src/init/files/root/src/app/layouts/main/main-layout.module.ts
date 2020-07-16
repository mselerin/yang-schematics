import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout.component';

const MODULES = [
  CommonModule,
  RouterModule
];

const DECLARATIONS = [
  MainLayoutComponent
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class MainLayoutModule {}
