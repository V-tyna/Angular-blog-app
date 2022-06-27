import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';

import { AlertComponent } from '../admin/shared/components/alert/alert.component';

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
