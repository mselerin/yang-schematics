import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header class="content-header">
      <h1>
        {{ title }}
        <small *ngIf="subtitle">{{ subtitle }}</small>
      </h1>
    </header>
    `
})
export class PageHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
}
