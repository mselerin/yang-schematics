import {Component} from '@angular/core';

declare const APP_MANIFEST: any;

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public manifest: any = APP_MANIFEST;
}
