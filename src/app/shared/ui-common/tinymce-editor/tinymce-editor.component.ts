import { Guid } from 'guid-typescript';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';

declare let tinymce: any;

export class TinymceContent {
  content: string;
  rawContent: string;

  constructor(inputContent: string = '', inputRawContent: string = '') {
    this.content = inputContent;
    this.rawContent = inputRawContent;
  }
}
@Component({
  selector: 'app-tinymce-editor',
  templateUrl: 'tinymce-editor.component.html',
  styleUrls: ['tinymce-editor.component.css']
})
export class TynimceEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('content')
  set content(value: string) {
    this._content = value;
    this.contentChange.emit(this._content);
    if (this.editor) {
      if (this.editor.getContent() !== this._content) {
        this.editor.setContent(this._content);
      }
      this.raiseRawContent();
    }
  }

  get content(): string {
    return this._content;
  }

  private _content: string;

  @Input('rawContent')
  set rawContent(value: string) {
    this._rawContent = value;
    this.rawContentChange.emit(this._rawContent);
  }

  get rawContent(): string {
    return this._rawContent;
  }

  private _rawContent: string;
  uploadElementId: string;
  @Input() elementId: string;
  @Input() editorHeight: number;
  @Input() hasError: boolean;

  @Output() contentChange = new EventEmitter();
  @Output() rawContentChange = new EventEmitter();
  @Output() blurChanged = new EventEmitter();
  @Output() finishedInitialization = new EventEmitter();

  editor;

  constructor() {
    this.uploadElementId = Guid.create().toString();
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
      paste_data_images: true,
      plugins: `print preview fullpage searchreplace autolink directionality visualblocks emoticons
      visualchars fullscreen image link media template codesample table charmap hr pagebreak
      nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help`,
      toolbar1: `formatselect | bold italic strikethrough forecolor backcolor | link image |
      alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat`,
      toolbar2: 'print preview media | forecolor backcolor emoticons',
      image_advtab: true,
      file_picker_callback: (callback, value, meta) => {
        if (meta.filetype === 'image') {
          const element = $(`#${this.uploadElementId}`) as any;
          element.trigger('click');
          element.on('change', function() {
            const file = element[0].files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
              callback(e.target.result, {
                alt: ''
              });
            };
            reader.readAsDataURL(file);
          });
        }
      },
      setup: editor => {
        this.editor = editor;
        editor.on('Blur', () => {
          this.blurChanged.emit(true);
        });
        editor.on('Focus', () => {
          this.blurChanged.emit(false);
        });
        editor.on('keyup change', () => {
          this.content = editor.getContent();
        });
        this.finishedInitialization.emit();
      },
    });
  }

  private raiseRawContent() {
    if (this.editor) {
      const body = this.editor.getBody();
      if (body) {
        let textContent = body.textContent;
        textContent = textContent.replace(/^[ \s]+|[ \s]+$/ig, '');
        this.rawContent = textContent;
      }
    }
  }

  reset() {
    this.content = '';
  }

  getClassStyle() {
    return this.hasError ? 'tinymce-has-error' : 'tinymce-editor';
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
