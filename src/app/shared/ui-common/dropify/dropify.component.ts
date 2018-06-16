import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { readBase64 } from '../../../utilities/convert-image-to-base64';

declare var $: any;

export interface FileInfo {

    // A base64 bytes of content file
    content: string;

    // A file name
    fileName: string;

    // A type of file
    type: string;

    // A size of file
    size: number;
}

export enum ErrorType {
    FileSize,
    MinWidth,
    MaxWidth,
    MinHeight,
    MaxHeight,
    ImageFormat
}

@Component({
    selector: 'app-dropify',
    templateUrl: 'dropify.component.html'
})

export class DropifyComponent implements AfterViewInit {

    // Call when select file changed
    @Output()
    fileChanged = new EventEmitter<FileInfo>();

    // Call when have an error occurs
    @Output()
    errors = new EventEmitter<ErrorType>();

    // Call when user click remove file button
    @Output()
    fileRemoved = new EventEmitter();

    // A max file size
    @Input()
    maxFileSize: string;

    // A allowed file extensions
    @Input()
    allowedFileExtensions: string;

    // Height of input content
    @Input()
    height: string;

    // Is show errors
    @Input()
    isShowError: boolean;

    // Error message
    @Input()
    errorMessage: string;

    // Default message
    @Input()
    defaultMessage: string;

    // Replace message
    @Input()
    replaceMessage: string;

    // Remove message
    @Input()
    removeMessage: string;

    // A dropify instance
    private dropify: any;

    constructor() {
    }

    ngAfterViewInit() {
        this.initializeDropify();
    }

    setDefaultContent(content) {
        const base64 = atob(content);
        this.dropify.showLoader();
        this.dropify.setPreview(true, base64);
    }

    initializeDropify() {
        const options = this.buildOptions();
        const drEvent = $('.dropify').dropify(options);
        this.dropify = drEvent.data('dropify');

        // Register droptify error occurs
        drEvent.on('dropify.error.fileSize', (event, element) => {
            this.raiseError(ErrorType.FileSize);
        });
        drEvent.on('dropify.error.minWidth', (event, element) => {
            this.raiseError(ErrorType.MinWidth);
        });
        drEvent.on('dropify.error.maxWidth', (event, element) => {
            this.raiseError(ErrorType.MaxWidth);
        });
        drEvent.on('dropify.error.minHeight', (event, element) => {
            this.raiseError(ErrorType.MinHeight);
        });
        drEvent.on('dropify.error.maxHeight', (event, element) => {
            this.raiseError(ErrorType.MaxHeight);
        });
        drEvent.on('dropify.error.imageFormat', (event, element) => {
            this.raiseError(ErrorType.ImageFormat);
        });
        drEvent.on('dropify.afterClear', (event, element) => {
            this.fileRemoved.emit();
        });
    }

    raiseError(errorType: ErrorType) {
        this.errors.emit(errorType);
    }

    onChanged($event) {
        const tgt = $event.target || window.event.srcElement,
            files = tgt.files;

        // Convert to base64
        if (files && files.length) {
            readBase64(files[0]).then(data => {
                if (data) {
                    const fileInfo = {
                        content: data as string,
                        fileName: files[0].name,
                        type: files[0].type,
                        size: files[0].size
                    };
                    this.fileChanged.emit(fileInfo);
                }
            });
        }
    }

    reset() {
        // Same as removed button clicked
        $('.dropify-clear').click();
    }

    private buildOptions() {
        return {
            maxFileSize: this.maxFileSize ? this.maxFileSize : 0,
            allowedFileExtensions: this.allowedFileExtensions ? this.allowedFileExtensions : ['*'],
            showErrors: this.isShowError ? this.isShowError : true,
            messages: {
                'default': this.defaultMessage ? this.defaultMessage : 'Drag and drop a file here or click',
                'replace': this.replaceMessage ? this.replaceMessage : 'Drag and drop or click to replace',
                'remove': this.removeMessage ? this.removeMessage : 'Remove',
                'error': this.errorMessage ? this.errorMessage : 'Ooops, something wrong happended.'
            }
        };
    }
}
