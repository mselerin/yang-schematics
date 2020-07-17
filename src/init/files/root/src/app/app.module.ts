import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core/core.module';
import {BaseModule} from '@app/shared/base.module';
import {FeaturesModule} from '@app/features/features.module';
import {LayoutsModule} from '@app/layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


const MODULES: any[] = [
  CoreModule,
  BaseModule,
  FeaturesModule,
  LayoutsModule,
  AppRoutingModule
];


@NgModule({
  imports: MODULES,
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
