import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PropercasePipe} from './pipes/propercase.pipe';
import {PageHeaderComponent} from './components/page-header.component';


const MODULES: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const DECLARATIONS: any[] = [
  PropercasePipe,
  PageHeaderComponent
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  exports: [...MODULES, ...DECLARATIONS]
})
export class SharedModule {
}
