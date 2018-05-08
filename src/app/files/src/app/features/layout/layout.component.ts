import {Component} from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
        <app-header></app-header>

        <div id="main-container">
            <router-outlet></router-outlet>
        </div>

        <app-footer></app-footer>
    `
})
export class LayoutComponent { }
