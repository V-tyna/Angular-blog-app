import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import 'froala-editor/js/plugins.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AlertComponent } from '../admin/shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    FroalaEditorModule,
    FroalaViewModule,
    AlertComponent, CommonModule
  ],
  declarations: [
    AlertComponent
  ]
})
export class SharedModule {

}