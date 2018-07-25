import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FEATURES_ROUTES } from './features/features.module';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', children: [...FEATURES_ROUTES] },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  providers: [],
  imports: [ RouterModule.forRoot(ROUTES, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
