// Angular Modules
import {NgModule} from '@angular/core';

// Components
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {FeaturesModule} from './features/features.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


const MODULES: any[] = [
  CoreModule,
  SharedModule,
  FeaturesModule,
  AppRoutingModule
];


const DECLARATIONS: any[] = [
  AppComponent
];


@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  bootstrap: [ AppComponent ]
})
export class AppModule { }
