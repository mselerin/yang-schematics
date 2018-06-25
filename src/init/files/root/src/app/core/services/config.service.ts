import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@app/models/app-config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService
{
  constructor(
    private http: HttpClient,
    public appConfig: AppConfig
  ) { }

  async loadConfig(): Promise<AppConfig> {
    let url = 'assets/config/app-config.json';
    let data = await this.http.get(url).toPromise();

    Object.assign(this.appConfig, new AppConfig(), data);
    return this.appConfig;
  }
}
