import {NgModule} from '@angular/core';

import {SharedModule} from '@app/shared/shared.module';
import {HeaderComponent} from './header.component';
import {FooterComponent} from './footer.component';
import {LayoutComponent} from './layout.component';

const MODULES = [
    SharedModule
];

const DECLARATIONS = [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
];


@NgModule({
    imports: MODULES,
    declarations: DECLARATIONS,
    exports: [LayoutComponent]
})
export class LayoutModule {}
