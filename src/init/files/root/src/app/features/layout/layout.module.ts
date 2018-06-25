import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponent } from './layout.component';

const MODULES = [
  SharedModule
];

const DECLARATIONS = [
  LayoutComponent
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  exports: [LayoutComponent]
})
export class LayoutModule {}
