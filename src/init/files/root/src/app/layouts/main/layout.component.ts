import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LOGGER } from '@app/services/logger.service';

declare const APP_MANIFEST: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent
{
  public manifest: any = APP_MANIFEST;

  constructor(
    public i18n: TranslateService
  ) {}
}
