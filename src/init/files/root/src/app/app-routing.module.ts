import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  providers: [],
  imports: [ RouterModule.forRoot(ROUTES, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
