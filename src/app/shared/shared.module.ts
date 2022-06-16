import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import 'froala-editor/js/plugins.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: []
})
export class SharedModule {

}