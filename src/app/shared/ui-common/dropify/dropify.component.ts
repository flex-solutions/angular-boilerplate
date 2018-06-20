import { isNil } from 'ramda';
import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChange } from '@angular/core';
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

    get image(): any {
        return this._image;
    }
    private _image: any;
    @Input('image')
    set image(value: any) {
        this._image = value;
        if (isNil(this._image) || this._image === '') {
            return;
        }
        try {
            const base64 = atob(this._image);
            if (this.dropify) {
                this.dropify.showLoader();
                this.dropify.setPreview(true, base64);
            }
        }
        catch {
            // not base 64 type, do nothing
        }
    }

    @Output()
    onImageChange = new EventEmitter();

    // Call when have an error occurs
    @Output()
    errors = new EventEmitter<ErrorType>();

    @Output()
    onFinishedInitialization = new EventEmitter();

    // A dropify instance
    private dropify: any;
    private maxSize: number = 0;

    constructor() {
    }

    ngAfterViewInit() {
        this.initializeDropify();
    }

    initializeDropify() {
        const options = this.buildOptions();
        const drEvent = $('.dropify').dropify(options);
        this.dropify = drEvent.data('dropify');
        const length = this.dropify.settings.maxFileSize.length
        const lastCharacter = this.dropify.settings.maxFileSize[length - 1]
        this.maxSize = parseInt(this.dropify.settings.maxFileSize)
        switch (lastCharacter.toUpperCase()) {
            case 'K': this.maxSize *= 1000; break;
            case 'M': this.maxSize *= 1000000; break;
        }
        this.onFinishedInitialization.emit();

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
            const fileInfo = {
                content: "",
                fileName: "",
                type: "",
                size: ""
            };
            this.onImageChange.emit(fileInfo);
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
            if (this.maxSize <= files[0].size) {
                const fileInfo = {
                    content: "",
                    fileName: "",
                    type: "",
                    size: ""
                };
                this.onImageChange.emit(fileInfo);
                return;
            }
            readBase64(files[0]).then(data => {
                if (data) {
                    const fileInfo = {
                        content: data as string,
                        fileName: files[0].name,
                        type: files[0].type,
                        size: files[0].size
                    };
                    this.onImageChange.emit(fileInfo);
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
