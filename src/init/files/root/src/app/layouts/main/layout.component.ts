import { Component } from '@angular/core';

declare const APP_MANIFEST: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public manifest: any = APP_MANIFEST;
}
