import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@app/models/app-config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService
{
  public app: AppConfig;

  constructor(
    private http: HttpClient
  ) {
    this.app = new AppConfig();
  }

  async loadAppConfig(): Promise<void> {
    let url = 'assets/config/app-config.json';
    let data = await this.http.get(url).toPromise();

    Object.assign(this.app, new AppConfig(), data);
  }
}
