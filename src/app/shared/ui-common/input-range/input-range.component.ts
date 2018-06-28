import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-input-range',
    templateUrl: 'input-range.component.html',
    styleUrls: ['input-range.component.css']
})
export class InputRangeComponent implements OnInit {
    @Input() title: string;

    constructor() { }

    ngOnInit() { }
}
