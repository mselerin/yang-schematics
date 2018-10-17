import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

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
    this.manifest = await this.http.get('assets/app-manifest.json').toPromise();
  }
}
