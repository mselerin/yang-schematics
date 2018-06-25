import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import {

< %= classify(name) % > RoutingModule
}
from
'./<%=dasherize(name)%>-routing.module';

const MODULES = [
  SharedModule,
  < %= classify(name) % > RoutingModule
];

const DECLARATIONS = [];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS
})
export class
< %= classify(name) % > Module
{
}
