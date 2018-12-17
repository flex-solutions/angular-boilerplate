import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-wizard-step',
    templateUrl: './wizard-step.component.html',
    styleUrls: ['./wizard-step.component.css']
})
export class WizardStepComponent {
    @Input()
    title: string;

    @Input()
    isFirstStep: boolean;

    @Input()
    isLastStep: boolean;

    @Output()
    beforeNext = new EventEmitter();

    @Output()
    doNext = new EventEmitter();

    @Output()
    beforePrevious = new EventEmitter();

    // Call before execute next action
    canNext: boolean;

    // Call before excute previous action
    canPrevious: boolean;

    titleClasses: string;
    bodyClasses: string;
    headerClasses: string;

    /**
     * A boolean describing if the wizard step is currently selected
     */
    public selected = false;

    constructor() {
        this.title = '';
        this.isFirstStep = false;
        this.isFirstStep = false;
        this.canNext = true;
        this.canPrevious = true;
    }

    updateClasses() {
        this.titleClasses = this.selected ? ' wz-title title current ' : ' title ';
        this.bodyClasses = this.selected ? ' body current wz-section' : ' body d-none wz-section ';
        this.headerClasses = this.buildHeaderClasses();
    }

    buildHeaderClasses() {
        let classes = '';
        if (this.selected) {
            classes += ' current ';
        } else {
            classes += ' current unselected';
        }

        if (this.isFirstStep) {
            classes += ' first ';
        }

        if (this.isLastStep) {
            classes += ' last ';
        }

        return classes;
    }
}

export enum WizardStep {
    Unknow,

    First,

    Last
}
