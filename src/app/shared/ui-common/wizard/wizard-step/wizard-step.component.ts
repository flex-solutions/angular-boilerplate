import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-wizard-step',
    templateUrl: './wizard-step.component.html',
    styleUrls: ['./wizard-step.component.css'],
})
export class WizardStepComponent {


    @Input()
    title: string;

    @Input()
    isFirstStep: boolean;

    @Input()
    isLastStep: boolean;

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
    }

    updateClasses() {
        this.titleClasses = this.selected ? ' wz-title title current ' : ' title ';
        this.bodyClasses = this.selected ? ' body current ' : ' body d-none';
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
