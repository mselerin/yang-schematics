/**
 * The BaseModule should only contains modules used across every modules & features.
 *
 * Do NOT import too much modules here to prevent a big vendor.js files.
 * Prefer importing external modules inside the features directly.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
