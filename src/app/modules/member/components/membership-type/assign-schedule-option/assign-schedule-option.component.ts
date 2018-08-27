import { MembershipType } from './../../../../../shared/models/membership-type.model';
import { DialogService } from '../../../../../shared/ui-common/modal/services/dialog.service';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { OnInit, Component } from '@angular/core';
import { BenefitScheduleType } from '../../../../../shared/models/membership-type.model';

@Component({
  selector: 'app-assign-schedule-option',
  templateUrl: 'assign-schedule-option.component.html'
})
export class AssignScheduleOptionComponent extends DialogComponent
  implements OnInit {
  selectedValue: any;
  schedule: BenefitScheduleType;
  membershipType: MembershipType;
  isAfterGetPoint: boolean;
  isRepeatAtSpecificDate: boolean;

  constructor(protected dialogService: DialogService) {
    super(dialogService);
    this.isRepeatAtSpecificDate = this.isAfterGetPoint = false;
  }

  ngOnInit(): void {
    this.schedule = this.callerData.schedule;
    this.membershipType = this.callerData.membershipType;

    switch (+this.schedule) {
      case BenefitScheduleType.RepeatAtSpecificDate:
        this.isRepeatAtSpecificDate = true;
        break;
      case BenefitScheduleType.GetXPoints:
        this.isAfterGetPoint = true;
        break;
    }
  }

  cancel() {
    this.result = null;
    this.dialogResult();
  }

  submit() {
    this.result = this.selectedValue;
    this.dialogResult();
  }
}
