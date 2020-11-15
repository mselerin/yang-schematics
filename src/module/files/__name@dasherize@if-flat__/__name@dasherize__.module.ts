import { NgModule } from '@angular/core';
import { BaseModule } from '@app/base.module';

const MODULES: any[] = [
  BaseModule
];

const DECLARATIONS: any[] = [
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS
})
export class <%=classify(name)%>Module {}
