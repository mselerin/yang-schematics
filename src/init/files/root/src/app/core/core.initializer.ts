import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOGGER, LogLevelEnum } from '@app/services/logger.service';
import { ConfigService } from '@app/services/config.service';
import { AppConfig } from '@app/models/app-config.model';

export async function init(injector: Injector): Promise<void> {
  console.log('Initializing application');

  // Retrieve services via the Injector (workaround for cyclic dependency error)
  addSplashItem('Configuration');
  const config: ConfigService = injector.get(ConfigService);
  const i18n: TranslateService = injector.get(TranslateService);

  await config.load('app', 'assets/config/app-config.json');
  const app = config.app as AppConfig;

  // Logging
  addSplashItem('Logging');
  LOGGER.clientLogLevel = LogLevelEnum.DEBUG;
  LOGGER.serverLogLevel = LogLevelEnum.ERROR;

  // LOGGER.loggingServiceUrl = '/api/log';

  // Translation
  addSplashItem('Translation');
  i18n.addLangs(app.languages || ['fr', 'en']);
  i18n.setDefaultLang(app.lang || 'fr');

  // Langue du navigateur
  let browserLang = i18n.getBrowserLang();
  LOGGER.debug(`Detected browser language : ${browserLang}`);

  if (i18n.getLangs().indexOf(browserLang) === -1) {
    browserLang = 'fr';
  }

  LOGGER.debug(`Using language : ${browserLang}`);
  await i18n.use(browserLang).toPromise();

  LOGGER.info('Core initialized');
  addSplashItem('Finishing core initialization');
}


export function addSplashItem(txt: string): void {
  if (!document || !document.querySelector) {
    return;
  }

  const el: any = document.querySelector('#splash-text ul');
  if (el) {
    el.innerHTML += `<li>${txt}</li>`;
  }
}
