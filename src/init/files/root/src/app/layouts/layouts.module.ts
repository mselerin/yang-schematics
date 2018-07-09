import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { MainLayoutModule } from '@app/layouts/main/main-layout.module';

const MODULES = [
  SharedModule,
  MainLayoutModule
];


@NgModule({
  imports: MODULES,
  exports: [MainLayoutModule]
})
export class LayoutsModule {}
