import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';


export class CoreTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): any {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(
      catchError(() => of({}))
    );
  }
}

export function httpLoaderFactory(http: HttpClient) {
  return new CoreTranslationLoader(http);
}


@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ]
})
export class I18NModule {
  constructor(@Optional() @SkipSelf() parentModule: I18NModule) {
    if (parentModule) {
      throw new Error(`I18NModule has already been loaded.`);
    }
  }
}
