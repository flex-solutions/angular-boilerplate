import { FileInfo } from './dropify.component';
import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { readBase64 } from '../../../utilities/convert-image-to-base64';
import { convertStringToBase64 } from '../../../utilities/convertStringToBase64';

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

export class DropifyError {
    errorValue : boolean;
    errorType: ErrorType;

    constructor(inputValue: boolean = false, errorType: ErrorType = null) {
        this.errorValue = inputValue;
        this.errorType = errorType;
    }
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

    private _image: string;
    @Input('image')
    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
        this.imageChange.emit(this._image)
        const base64 = convertStringToBase64(value);
        if (this.dropify) {
            this.dropify.showLoader();
            this.dropify.setPreview(true, base64);
        }
    }

    @Output()
    imageChange = new EventEmitter<string>();

    private _exportError: DropifyError = new DropifyError();
    @Input('exportError')
    get exportError(): DropifyError {
        return this._exportError;
    }

    set exportError(value: DropifyError) {
        this._exportError = value;
        this.exportErrorChange.emit(this._exportError)
    }

    @Output()
    exportErrorChange = new EventEmitter<DropifyError>();

    // Call when have an error occurs
    @Output()
    errors = new EventEmitter<any>();

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
            this.image = "";
            this.resetError();
        });
    }

    raiseError(errorType: ErrorType) {
        let error = new DropifyError(true, errorType);
        this.exportError = error;
    }

    resetError() {
        const error = new DropifyError(false, null);
        this.exportError = error;
    }

    onChanged($event) {
        const tgt = $event.target || window.event.srcElement,
            files = tgt.files;

        // Convert to base64
        if (files && files.length) {
            if (this.maxSize <= files[0].size) {
                this.image = "";
                return;
            }
            readBase64(files[0]).then(data => {
                if (data) {
                    this.image = data as string;
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
