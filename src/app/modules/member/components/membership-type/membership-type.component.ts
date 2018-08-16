import { MembershipTypeDeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { TranslateService } from './../../../../shared/services/translate.service';
import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipTypeService } from './../../services/membership-type.service';
import { MembershipType } from './../../../../shared/models/membership-type.model';
import { OnInit, Component } from '@angular/core';
import { MembershipTypeRoute } from '../../constants/member.constants';
import { filter, sortBy } from 'lodash';
@Component({
  selector: 'app-membership-type-home',
  templateUrl: './membership-type.component.html',
  styleUrls: ['membership-type.component.css']
})
export class MembershipTypeHomeComponent implements OnInit {

  public accumulateTypes: MembershipType[] = [];
  public internalTypes: MembershipType[] = [];
  private confirmDeleteMsg: string;
  private deleteSuccessMsg: string;

  constructor(private readonly membershipTypeService: MembershipTypeService,
  private readonly router: Router,
  private readonly activatedRoute: ActivatedRoute,
  private readonly notification: NotificationService,
  private readonly exDlg: ExDialog,
  private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.getMembershipTypes();
  }

  createNewMembershipType() {
    this.router.navigate([MembershipTypeRoute.CREATE], { relativeTo: this.activatedRoute });
  }

  editMembershipType(id: string) {
    this.router.navigate([MembershipTypeRoute.UPDATE, id], { relativeTo: this.activatedRoute });
  }

  deleteMembershipType(membershipType: MembershipType) {

    this.confirmDeleteMsg = this.translateService.translate('membership-type-delete-confirm', [membershipType.name]);
    this.deleteSuccessMsg = this.translateService.translate('membership-type-delete-success');
    this.membershipTypeService.countMember(membershipType._id).subscribe(count => {
      if (count === 0) {
        this.exDlg.openConfirm(this.confirmDeleteMsg).subscribe(result => {
          if (result) {
            this.doDelete(membershipType._id);
          }
        });
      } else {
        this.exDlg
        .openPrime(MembershipTypeDeleteConfirmationComponent, { callerData: membershipType })
        .subscribe(result => {
          if (result) {
            this.doDelete(membershipType._id, result.movingId);
          }
        });
      }
    });
  }

  private doDelete(id: string, movingId: string = '') {
    this.membershipTypeService.deleteMembershipType(id, movingId).subscribe(() => {
      this.notification.showSuccess(this.deleteSuccessMsg);
      this.getMembershipTypes();
    });
  }

  private getMembershipTypes() {
    this.membershipTypeService.getMembershipTypes().subscribe(membershipTypes => {

      this.accumulateTypes = sortBy(filter(membershipTypes, (mt: MembershipType) => mt.isAccumulated === true),
      MembershipType.Fields.POINT);

      this.internalTypes = sortBy(filter(membershipTypes, (mt: MembershipType) => !mt.isAccumulated),
      MembershipType.Fields.POINT);
    });
  }
}
