import {Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {addSplashItem} from './core.initializer';

export async function init(injector: Injector): Promise<void> {
  console.log('Initializing i18n');
  addSplashItem('Translation');
  const i18n: TranslateService = injector.get(TranslateService);

  // Translation
  i18n.addLangs(['en', 'fr']);
  i18n.setDefaultLang('en');

  // Langue du navigateur
  let browserLang = i18n.getBrowserLang();
  console.log(`Detected browser language : ${browserLang}`);

  if (i18n.getLangs().indexOf(browserLang) === -1) {
    browserLang = i18n.getDefaultLang();
  }

  console.log(`Using language : ${browserLang}`);
  await i18n.use(browserLang).toPromise();
}
