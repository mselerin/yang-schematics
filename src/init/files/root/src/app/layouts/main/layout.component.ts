import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LOGGER } from '@app/services/logger.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit
{
  public manifest: any = {};

  constructor(
    public i18n: TranslateService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {
      this.manifest = await this.http.get('assets/app-manifest.json').toPromise();
    }
    catch (err) {
      LOGGER.warn(`Cannot load manifest file`);
      this.manifest = {
        'version': 'unknown',
        'buildDate': '2018-01-01T00:00:00.000Z'
      };
    }
  }
}
