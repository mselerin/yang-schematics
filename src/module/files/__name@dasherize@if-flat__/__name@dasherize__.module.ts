import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

const MODULES: any[] = [
  SharedModule
];

const DECLARATIONS: any[] = [
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS
})
export class <%=classify(name)%>Module {}
