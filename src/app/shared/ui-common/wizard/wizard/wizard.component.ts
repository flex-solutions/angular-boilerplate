import { Component, AfterContentInit, QueryList, ContentChildren, EventEmitter, Output, Input } from '@angular/core';
import { WizardNavigator } from '../wizard-navigator';
import { WizardStepComponent, WizardStep } from '../wizard-step/wizard-step.component';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.css'],
    providers: [WizardNavigator]
})
export class WizardComponent implements AfterContentInit {

    //  Call when cancel button clicked
    @Output()
    cancelClicked = new EventEmitter();

    // Call when finish clicked
    @Output()
    finishClicked = new EventEmitter();

    // Call when selected step changed
    @Output()
    stepChanged = new EventEmitter<WizardStep>();

    @Output()
    validated = new EventEmitter();

    // Call before execute next action
    canNext: boolean;

    // Call before excute previous action
    canPrevious: boolean;


    /**
    * A QueryList containing all [[WizardStep]]s inside this wizard
    */
    @ContentChildren(WizardStepComponent)
    wizardSteps: QueryList<WizardStepComponent>;

    // A wizard step was showed
    selectedStep: WizardStepComponent;

    constructor(public wizardNavigator: WizardNavigator) {
        this.canNext = true;
        this.canPrevious = true;
    }

    ngAfterContentInit(): void {
        // add a subscriber to the wizard steps QueryList to listen to changes in the DOM
        this.wizardSteps.changes.subscribe(changedWizardSteps => {
            this.wizardNavigator.updateWizardSteps(changedWizardSteps.toArray(), this);
        });

        // initialize the model
        this.wizardNavigator.updateWizardSteps(this.wizardSteps.toArray(), this);
    }

    onPrevious() {
        if (this.canPrevious) {
            this.wizardNavigator.previous();
        }
    }

    onNext() {
        console.log('onNext...');
        this.validated.emit();
        console.log('onNext...DONE' + this.canNext);
        if (this.canNext) {
            this.wizardNavigator.next();
        }
    }

    onCancel() {
        this.cancelClicked.emit();
    }

    onFinish() {
        this.finishClicked.emit();
    }

    onSelectedStepChanged(selectedStep: WizardStepComponent) {
        this.selectedStep = selectedStep;
        const step = this.selectedStep.isFirstStep ? WizardStep.First :
            (this.selectedStep.isLastStep ? WizardStep.Last : WizardStep.Unknow);
        this.stepChanged.emit(step);
    }

}
