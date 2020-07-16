import {NgModule} from '@angular/core';
import {CoreModule} from './core/core.module';
import {FeaturesModule} from './features/features.module';
import {LayoutsModule} from './layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


const MODULES: any[] = [
  CoreModule,
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
