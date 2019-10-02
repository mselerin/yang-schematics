import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGGER } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  [key: string]: any;

  constructor(
    private http: HttpClient
  ) {
    this[`app`] = {};
  }

  async load(prefix: string, url: string) {
    try {
      this[prefix] = await this.http.get(url).toPromise();
    } catch (err) {
      LOGGER.error(`Cannot load configuration file [${url}]`);
    }
  }

  get(key: string, def: any = null): any {
    const value = key.split('.').reduce((o, i) => (o !== undefined && o != null) ? o[i] : null, this);
    return (value !== null && value !== undefined ? value : def);
  }
}
