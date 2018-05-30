import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-txt-search',
    templateUrl: 'search-textbox.component.html',
    styleUrls: ['search-textbox.component.css']
})

export class SearchTextboxComponent implements OnInit {

    @Input() searchPlaceholder: string;
    private _searchKey: string;

    @Input()
    public get searchKey() {
        return this._searchKey;
    }

    public set searchKey(v) {
        this._searchKey = v;
    }

    constructor() { }

    ngOnInit() { }
}
