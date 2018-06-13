import { IImageChange } from './dropify.component';
import { init, any } from 'ramda';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

declare var $: any;

export interface IImageChange {
    image: String;
}

@Component({
    selector: 'app-dropify',
    templateUrl: 'dropify.component.html'
})

export class DropifyComponent implements OnInit, AfterViewInit {

    // Call when image changed
    @Output()
    imageChanged = new EventEmitter<IImageChange>();

    @Input()
    maxFileSize: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        { $('.dropify').dropify({}); }
    }

    onChanged(event: IImageChange) {
        this.imageChanged.emit(event);
    }
}
