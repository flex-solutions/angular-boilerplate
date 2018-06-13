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
    
    @Output() onImageChange = new EventEmitter<IImageChange>();;
    constructor() {
    }

    ngOnInit() { 
    }

    ngAfterViewInit(): void {
        { $('.dropify').dropify({}); }
    }

    imageChanged(event: IImageChange) {
        this.onImageChange.emit(event);
    }
}
