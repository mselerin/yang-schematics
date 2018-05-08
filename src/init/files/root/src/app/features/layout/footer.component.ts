import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-footer',
    template: `
        <footer id="main-footer">
            Version : {{ manifest.version }}
            - Build date : {{ manifest.buildDate | date:'dd-MM-y' }}
        </footer>
    `
})
export class FooterComponent implements OnInit
{
    public manifest: any = {};

    constructor(
        private http: HttpClient
    ) { }

    async ngOnInit() {
        this.manifest = await this.http.get('assets/app-manifest.json').toPromise();
    }
}
