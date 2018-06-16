import { init, any, isEmpty } from 'ramda';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, forwardRef, NgZone, OnChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

declare let tinymce: any;

@Component({
  selector: 'app-tinymce-editor',
  templateUrl: 'tinymce-editor.component.html'
})
export class TynimceEditorComponent implements OnInit, AfterViewInit {
  @Input() content: string;
  @Input() elementId: string;
  @Input() editorHeight: number;

  @Output() onEditorContentChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  editor;

  constructor() {
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    tinymce.init({
      selector: '#' + this.elementId,
      height: this.editorHeight ? this.editorHeight : 500,
      theme: 'modern',
      plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
      toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      setup: editor => {
        this.editor = editor;
        editor.on('Blur', () => {
          this.onBlur.emit(true);
        });
        editor.on('Focus', () => {
          this.onBlur.emit(false);
        });
        editor.on('change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
          this.editor.save();
        });
      },
    });
  }

  reset() {
    this.content = "";
    this.editor.setContent("");
    this.editor.undoManager.clear();
    this.editor.load();
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
