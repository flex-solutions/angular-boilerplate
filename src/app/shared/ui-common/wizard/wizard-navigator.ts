import { WizardComponent } from './wizard/wizard.component';
import { Injectable } from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@Injectable()
export class WizardNavigator {
    wizardSteps: WizardStepComponent[];
    defaultSelectedStep: number;
    private _currentStep: number;
    private _wizard: WizardComponent;

    constructor() {
        this.defaultSelectedStep = 0;
        this._currentStep = this.defaultSelectedStep;
    }

    updateWizardSteps(steps: WizardStepComponent[], wizard: WizardComponent) {
        this.wizardSteps = steps;
        this._wizard = wizard;
        this.resetToDefaultStep();
    }

    private _updateSelectedStep(id: number) {
        this._currentStep = id;
        for (let i = 0; i < this.wizardSteps.length; i++) {
            const step = this.wizardSteps[i];
            step.selected = id === i;
            step.updateClasses();
            if (step.selected) {
                this._wizard.onSelectedStepChanged(step);
            }
        }
    }

    resetToDefaultStep() {
        this._updateSelectedStep(this.defaultSelectedStep);
    }

    next() {
        const nextIdStep = this._currentStep + 1;
        if (this._canNext(nextIdStep)) {
            this._updateSelectedStep(nextIdStep);
        }
    }

    private _canNext(nextIdStep: number) {
        if (nextIdStep >= this.wizardSteps.length) {
            return false;
        }
        return true;
    }

    previous() {
        const previousIdStep = this._currentStep - 1;
        if (this._canPrevious(previousIdStep)) {
            this._updateSelectedStep(previousIdStep);
        }
    }

    private _canPrevious(previousIdStep: number) {
        if (previousIdStep < 0) {
            return false;
        }
        return true;
    }
}
