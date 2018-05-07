import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    template: `
        <header id="main-header">
            <p>
                <select #langSelect (change)="translate.use(langSelect.value)">
                    <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
                </select>
            </p>
        </header>
    `
})
export class HeaderComponent
{
    constructor(
        public translate: TranslateService
    ) {}
}
