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
