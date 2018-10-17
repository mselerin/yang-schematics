// Rxjs
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Angular Modules
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Services
import { CoreInitializer } from './core.initializer';

// Modules
import { InterceptorsModule } from './core.interceptors';


// App init
export function coreInitFactory(coreInit: CoreInitializer) {
  return () => coreInit.init();
}


// Translation
export class CoreTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): any {
    return this.http.get(`assets/i18n/${lang}.json`)
      .pipe(
        catchError(() => of({}))
      );
  }
}

export function httpLoaderFactory(http: HttpClient) {
  return new CoreTranslationLoader(http);
}


const PROVIDERS = [
  // Init application
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: coreInitFactory,
    deps: [CoreInitializer]
  }
];


const MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient]
    }
  }),
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
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
