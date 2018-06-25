import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  template: `
        <header id="main-header">
            <p>
                <select #langSelect (change)="translate.use(langSelect.value)">
                    <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
                </select>
            </p>
        </header>

        <div id="main-container">
            <router-outlet></router-outlet>
        </div>

        <footer id="main-footer">
            Version : {{ manifest.version }}
            - Build date : {{ manifest.buildDate | date:'dd-MM-y' }}
        </footer>
    `
})
export class LayoutComponent implements OnInit {
  public manifest: any = {};

  constructor(
    public translate: TranslateService,
    private http: HttpClient
  ) {
  }

  async ngOnInit() {
    this.manifest = await this.http.get('assets/app-manifest.json').toPromise();
  }
}
