import { init, any } from 'ramda';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

declare let tinymce: any;

@Component({
    selector: 'app-tinymce-editor',
    templateUrl: 'tinymce-editor.component.html',
})

export class TynimceEditorComponent implements OnInit, AfterViewInit {
    @Input() content: string;
    @Input() elementId: string;

    @Output() onEditorContentChange = new EventEmitter();
    editor;
    constructor() {
    }

    ngOnInit() { }

    ngAfterViewInit(): void {
      tinymce.init({
        selector: '#' + this.elementId,
        height: 500,
        theme: 'modern',
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        image_advtab: true,
        setup: editor => {
          this.editor = editor;
          editor.on('keyup change', () => {
            const content = editor.getContent();
            this.onEditorContentChange.emit(content);
          });
        }
       });
    }
}
