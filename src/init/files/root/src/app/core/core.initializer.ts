import {Injector} from '@angular/core';
import {LOGGER, LogLevelEnum} from '@app/services/logger.service';
import {ConfigService} from '@app/services/config.service';

export async function init(injector: Injector): Promise<void> {
  console.log('Initializing application');

  // Retrieve services via the Injector (workaround for cyclic dependency error)
  addSplashItem('Configuration');
  const config: ConfigService = injector.get(ConfigService);
  await config.load('app', 'assets/config/app-config.json');

  // Logging
  addSplashItem('Logging');
  LOGGER.clientLogLevel = LogLevelEnum.DEBUG;
  LOGGER.serverLogLevel = LogLevelEnum.ERROR;

  // LOGGER.loggingServiceUrl = '/api/log';

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
