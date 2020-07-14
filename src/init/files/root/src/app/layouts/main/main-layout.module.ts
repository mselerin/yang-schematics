import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared/shared.module';
import {MainLayoutComponent} from './main-layout.component';

const MODULES = [
  SharedModule
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
