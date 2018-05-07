import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LOGGER, LogLevelEnum} from './services/logger.service';
import {ConfigService} from './services/config.service';
import {AppConfig} from '@app/models/app-config.model';

@Injectable()
export class CoreInitializer
{
    constructor(
        private injector: Injector
    ) {}

    public init(): Promise<void> {
        console.log('Initializing application');

        // Retrieve services via the Injector (workaround for cyclic dependency error)
        const configService: ConfigService = this.injector.get(ConfigService);
        const translate: TranslateService = this.injector.get(TranslateService);

        return configService.loadConfig()
            .then((config: AppConfig) => {
                // Logging
                LOGGER.clientLogLevel = LogLevelEnum.DEBUG;
                LOGGER.serverLogLevel = LogLevelEnum.ERROR;

                // LOGGER.loggingServiceUrl = '/api/log';

                // Translation
                translate.addLangs(config.languages);
                translate.setDefaultLang(config.lang);

                // Langue du navigateur
                let browserLang = translate.getBrowserLang();
                LOGGER.debug(`Detected browser language : ${browserLang}`);

                if (translate.getLangs().indexOf(browserLang) === -1)
                    browserLang = 'fr';

                LOGGER.debug(`Using language : ${browserLang}`);
                return translate.use(browserLang).toPromise();
            })
           .then(() => {
              LOGGER.info('Application initialized');
           });
    }
}
