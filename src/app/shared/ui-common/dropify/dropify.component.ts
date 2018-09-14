import { FileInfo } from './dropify.component';
import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
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

export interface IDropifyMessage {
  defaultMessage: string;
  replaceMessage: string;
  removeMessage: string;
  errorMessage: string;
}

export interface IDropifyErrorMessage {
  fileSize: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  imageFormat: string;
}

@Component({
  selector: 'app-dropify',
  templateUrl: 'dropify.component.html'
})
export class DropifyComponent implements AfterViewInit {
  // A max file size
  @Input() maxFileSize: string;
  // A allowed file extensions
  @Input() allowedFileExtensions: string;
  // Height of input content
  @Input() height: string;
  @Input() message: IDropifyMessage;
  @Input() errorMessage: IDropifyErrorMessage;

  @Output() fileChange = new EventEmitter<string>();
  private _file: string;
  @Input()
  get file(): string {
    return this._file;
  }
  set file(value: string) {
    // check value is base 64 or not
    const base64 = convertStringToBase64(value);
    if (base64 === this._file) {
      return;
    }
    // when value is base 64, set preview
    this.setPreview(base64);
    setTimeout(() => {
      this.fileChange.emit(this._file);
    });
  }

  // A dropify instance
  private dropify: any;
  private maxSize = 0;

  public error = false;

  ngAfterViewInit() {
    this.initializeDropify();
  }

  initializeDropify() {
    const options = this.buildOptions();
    const drEvent = $('.dropify').dropify(options);
    this.dropify = drEvent.data('dropify');
    const length = this.dropify.settings.maxFileSize.length;
    const lastCharacter = this.dropify.settings.maxFileSize[length - 1];
    this.maxSize = parseInt(this.dropify.settings.maxFileSize, null);
    switch (lastCharacter.toUpperCase()) {
      case 'K':
        this.maxSize *= 1000;
        break;
      case 'M':
        this.maxSize *= 1000000;
        break;
    }

    // Register droptify error occurs
    drEvent.on('dropify.error.fileSize', () => {
      this.raiseError();
    });
    drEvent.on('dropify.error.minWidth', () => {
      this.raiseError();
    });
    drEvent.on('dropify.error.maxWidth', () => {
      this.raiseError();
    });
    drEvent.on('dropify.error.minHeight', () => {
      this.raiseError();
    });
    drEvent.on('dropify.error.maxHeight', () => {
      this.raiseError();
    });
    drEvent.on('dropify.error.imageFormat', () => {
      this.raiseError();
    });
    drEvent.on('dropify.afterClear', () => {
      this.file = undefined;
      this.resetError();
    });
  }

  raiseError() {
    this.error = true;
  }

  resetError() {
    this.error = false;
  }

  onChanged($event) {
    const tgt = $event.target || window.event.srcElement,
    files = tgt.files;

    // Convert to base64
    if (files && files.length) {
      if (this.maxSize <= files[0].size) {
        this.file = undefined;
        return;
      }
      readBase64(files[0]).then(data => {
        if (data) {
          this.file = data as string;
        }
      });
    }
  }

  reset() {
    // Same as removed button clicked
    this.dropify.resetPreview();
    this.dropify.clearElement();
  }

  private setPreview(value) {
    if (this._file === value) {
      return;
    }

    this._file = value;
    if (this.dropify) {
      this.dropify.showLoader();
      this.dropify.setPreview(true, this._file);
      this.resetError();
    }
  }

  private buildOptions() {
    return {
      maxFileSize: this.maxFileSize ? this.maxFileSize : 0,
      allowedFileExtensions: this.allowedFileExtensions
        ? this.allowedFileExtensions
        : ['*'],
      showErrors: true,
      messages: {
        default: this.message
          ? this.message.defaultMessage
          : 'Drag and drop a file here or click',
        replace: this.message
          ? this.message.replaceMessage
          : 'Drag and drop or click to replace',
        remove: this.message ? this.message.removeMessage : 'Remove',
        error: this.message
          ? this.message.errorMessage
          : 'Ooops, something wrong happended.'
      },
      error: {
        'fileSize': this.errorMessage ? this.errorMessage.fileSize : 'The file size is too big ({{ value }} max)',
        'minWidth': this.errorMessage ? this.errorMessage.minWidth : 'The image width is too small ({{ value }}}px min)',
        'maxWidth': this.errorMessage ? this.errorMessage.maxWidth : 'The image width is too big ({{ value }}}px max)',
        'minHeight': this.errorMessage ? this.errorMessage.minHeight : 'The image height is too small ({{ value }}}px min)',
        'maxHeight': this.errorMessage ? this.errorMessage.maxHeight : 'The image height is too big ({{ value }}px max)',
        'imageFormat': this.errorMessage ? this.errorMessage.imageFormat : 'The image format is not allowed ({{ value }} only)'
      }
    };
  }
}
