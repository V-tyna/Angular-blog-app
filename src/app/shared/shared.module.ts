import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
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
  ]
})
export class SharedModule {

}