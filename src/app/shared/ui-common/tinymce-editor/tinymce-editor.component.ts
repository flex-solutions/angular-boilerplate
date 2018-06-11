import { init, any } from 'ramda';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare let tinymce: any;

@Component({
    selector: 'app-tinymce-editor',
    templateUrl: 'tinymce-editor.component.html',
})

export class TynimceEditorComponent implements OnInit, AfterViewInit {


    @Input() content: string;
    @ViewChild('tinymce') myElement: ElementRef
    constructor() {

    }

    ngOnInit() { }

    ngAfterViewInit(): void {
        // this.myElement.nativeElement.init({
        //     selector: 'textarea',
        //     height: 500,
        //     theme: 'modern',
        //     plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
        //     toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        //     image_advtab: true,
        //     templates: [
        //         { title: 'Test template 1', content: 'Test 1' },
        //         { title: 'Test template 2', content: 'Test 2' }
        //     ],
        //     content_css: [
        //         '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        //         '//www.tinymce.com/css/codepen.min.css'
        //     ]
        //     });

        tinymce.init({
            selector: "#abc",
            height: 500,
            theme: 'modern',
            plugins: [
              'advlist autolink lists link image charmap print preview hr anchor pagebreak',
              'searchreplace wordcount visualblocks visualchars code fullscreen',
              'insertdatetime media nonbreaking save table contextmenu directionality',
              'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
              },
              {
                title: 'Test template 2',
                content: 'Test 2'
              }
            ],
            content_css: []
          });
    }
}
