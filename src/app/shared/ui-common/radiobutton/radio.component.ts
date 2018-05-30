import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-radio',
    templateUrl: 'radio.component.html',
    styleUrls: ['radio.component.css']
})

export class RadioButtonComponent implements OnInit {

    @Output() valueChanged = new EventEmitter<any>();
    @Input() name: string;
    @Input() isEnable = true;
    @Input() isChecked: boolean;
    @Input() value: any;

    private _content: any;
    @Input()
    public get content() {
        return this._content;
    }

    public set content(v: any) {
        this._content = v;
    }

    constructor() { }

    ngOnInit() { }

    onCheckingChanged(value) {
        this.valueChanged.emit(value);
    }
}
