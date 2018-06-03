import { Input, Directive, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { DataScope } from '../../../shared/models/permission-scheme.model';

declare let $: any;

@Directive({ selector: '[appDatascope]' })

export class DataScopeDirective implements OnChanges, AfterViewInit {
    @Input() dataScope: DataScope;
    host: any;

    constructor(el: ElementRef) {

        this.host = el.nativeElement;
    }

    ngOnChanges() {
        this.createStatusCtrl();
    }

    ngAfterViewInit() {
        this.createStatusCtrl();
    }

    private createStatusCtrl() {
        switch (this.dataScope) {
            case DataScope.Branch:
                $(this.host).html('<label class="badge badge-info">Branch</label>');
                break;
            case DataScope.Full:
                $(this.host).html('<label class="badge badge-success">Full</label>');
                break;
        }
    }
}
