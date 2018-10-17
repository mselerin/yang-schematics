import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOGGER, LogLevelEnum } from '@app/services/logger.service';
import { ConfigService } from '@app/services/config.service';
import { AppConfig } from '@app/models/app-config.model';

@Injectable()
export class CoreInitializer
{
  constructor(
    private injector: Injector
  ) {}

  public async init(): Promise<void> {
    console.log('Initializing application');

    // Retrieve services via the Injector (workaround for cyclic dependency error)
    const config: ConfigService = this.injector.get(ConfigService);
    const i18n: TranslateService = this.injector.get(TranslateService);

    await config.loadAppConfig();

    // Logging
    LOGGER.clientLogLevel = LogLevelEnum.DEBUG;
    LOGGER.serverLogLevel = LogLevelEnum.ERROR;

    // LOGGER.loggingServiceUrl = '/api/log';

    // Translation
    i18n.addLangs(config.app.languages);
    i18n.setDefaultLang(config.app.lang);

    // Langue du navigateur
    let browserLang = i18n.getBrowserLang();
    LOGGER.debug(`Detected browser language : ${browserLang}`);

    if (i18n.getLangs().indexOf(browserLang) === -1)
      browserLang = 'fr';

    LOGGER.debug(`Using language : ${browserLang}`);
    await i18n.use(browserLang).toPromise();

    LOGGER.info('Application initialized');
  }
}
