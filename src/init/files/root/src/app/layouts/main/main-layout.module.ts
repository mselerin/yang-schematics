import {NgModule} from '@angular/core';
import {BaseModule} from '@app/shared/base.module';
import {MainLayoutComponent} from './main-layout.component';

const DECLARATIONS = [
  MainLayoutComponent
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [
    BaseModule
  ]
})
export class MainLayoutModule {}
