import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService
{
  [key: string]: any;

  constructor (
    private http: HttpClient
  ) {
    this.app = {};
  }

  async loadAppConfig(): Promise<void> {
    await this.loadConfig('app', 'assets/config/app-config.json');
  }

  async loadConfig(prefix: string, url: string) {
    this[prefix] = await this.http.get(url).toPromise();
  }

  get(key: string, def: any = null): any {
    const value = key.split('.').reduce((o, i) => (o != undefined && o != null) ? o[i] : null, this);
    return (value !== null && value !== undefined ? value : def);
  }
}
