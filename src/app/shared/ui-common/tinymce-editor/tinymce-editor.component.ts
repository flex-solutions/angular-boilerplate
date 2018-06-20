import { init, any, isEmpty } from 'ramda';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, forwardRef, NgZone, OnChanges, SimpleChange } from '@angular/core';
import { isNullOrUndefined } from 'util';

declare let tinymce: any;
declare let $: any;

@Component({
  selector: 'app-tinymce-editor',
  templateUrl: 'tinymce-editor.component.html',
  styleUrls: ['tinymce-editor.component.css']
})
export class TynimceEditorComponent implements OnInit, AfterViewInit {
  @Input('content')
  set content(value: string) {
    this._content = value;
    if (this.editor) {
      this.editor.setContent(this._content);
      this.raiseRawContent();
    }
  }

  get content(): string {
    return this._content
  }
  private _content: string;
  @Input() elementId: string;
  @Input() editorHeight: number;
  @Input() hasError: boolean;

  @Output() onEditorContentChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onEmptyRawContent = new EventEmitter();
  @Output() onFinishedInitialization = new EventEmitter();

  editor;

  constructor() {
  }

  ngOnInit() { this.hasError = false; }

  ngAfterViewInit(): void {
    this.initTinyEditor();
  }

  private initTinyEditor() {
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
          this.raiseRawContent();
        });
        this.onFinishedInitialization.emit();
      },
    })
  }

  private raiseRawContent() {
    let body = this.editor.getBody();
    var textcontent = body.textContent;
    textcontent = textcontent.replace(/^[ \s]+|[ \s]+$/ig, '');
    this.onEmptyRawContent.emit(textcontent);
  }

  reset() {
    this.content = "";
    this.editor.setContent("");
    this.raiseRawContent();
  }

  getClassStyle() {
    return this.hasError ? 'tinymce-has-error' : 'tinymce-editor';
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
