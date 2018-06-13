import { Component, AfterContentInit, QueryList, ContentChildren, EventEmitter, Output } from '@angular/core';
import { WizardNavigator } from '../wizard-navigator';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

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

    /**
    * A QueryList containing all [[WizardStep]]s inside this wizard
    */
    @ContentChildren(WizardStepComponent)
    wizardSteps: QueryList<WizardStepComponent>;

    // A wizard step was showed
    selectedStep: WizardStepComponent;

    constructor(public wizardNavigator: WizardNavigator) {

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
        this.wizardNavigator.previous();
    }

    onNext() {
        this.wizardNavigator.next();
    }

    onCancel() {
        this.cancelClicked.emit();
    }

    onFinish() {
        this.finishClicked.emit();
    }

    onSelectedStepChanged(selectedStep: WizardStepComponent) {
        this.selectedStep = selectedStep;
    }

}
