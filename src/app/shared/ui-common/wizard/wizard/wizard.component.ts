import { Component, AfterContentInit, QueryList, ContentChildren } from '@angular/core';
import { WizardNavigator } from '../wizard-navigator';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  providers: [WizardNavigator]
})
export class WizardComponent implements AfterContentInit {

  constructor(public wizardNavigator: WizardNavigator) {

  }
  /**
 * A QueryList containing all [[WizardStep]]s inside this wizard
 */
  @ContentChildren(WizardStepComponent)
  public wizardSteps: QueryList<WizardStepComponent>;

  ngAfterContentInit(): void {
      // add a subscriber to the wizard steps QueryList to listen to changes in the DOM
      this.wizardSteps.changes.subscribe(changedWizardSteps => {
          this.wizardNavigator.updateWizardSteps(changedWizardSteps.toArray());
      });

      // initialize the model
      this.wizardNavigator.updateWizardSteps(this.wizardSteps.toArray());
  }

  onPrevious() {
      this.wizardNavigator.previous();
  }

  onNext() {
      this.wizardNavigator.next();
  }

}
