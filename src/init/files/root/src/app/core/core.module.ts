import {APP_INITIALIZER, Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {init as coreInitializer} from './core.initializer';
import {InterceptorsModule} from './core.interceptors';


// App init
const INITIALIZERS = [
  coreInitializer
];

export function initializersFactory(injector: Injector) {
  return async () => {
    for (const init of INITIALIZERS) {
      await init(injector);
    }
  };
}


const PROVIDERS = [
  // Init application
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: initializersFactory,
    deps: [Injector]
  }
];


const MODULES = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  InterceptorsModule
];


@NgModule({
  providers: PROVIDERS,
  imports: MODULES
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
