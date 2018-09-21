import { MembershipTypeDeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { TranslateService } from './../../../../shared/services/translate.service';
import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipTypeService } from './../../services/membership-type.service';
import { MembershipType } from './../../../../shared/models/membership-type.model';
import { OnInit, Component } from '@angular/core';
import { MembershipTypeRoute } from '../../constants/member.constants';
import { filter, sortBy, map } from 'lodash';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
@Component({
  selector: 'app-membership-type-home',
  templateUrl: './membership-type.component.html',
  styleUrls: ['membership-type.component.css']
})
export class MembershipTypeHomeComponent implements OnInit {
  public accumulateTypes: MembershipType[] = [];
  public internalTypes: MembershipType[] = [];
  private deleteSuccessMsg: string;

  constructor(
    private readonly membershipTypeService: MembershipTypeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notification: NotificationService,
    private readonly exDlg: ExDialog,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.deleteSuccessMsg = this.translateService.translate(
      'membership-type-delete-success'
    );
    this.getMembershipTypes();
  }

  createNewMembershipType() {
    this.router.navigate([MembershipTypeRoute.CREATE], {
      relativeTo: this.activatedRoute
    });
  }

  editMembershipType(id: string) {
    this.router.navigate([MembershipTypeRoute.UPDATE, id], {
      relativeTo: this.activatedRoute
    });
  }

  deleteMembershipType(membershipType: MembershipType) {
    this.membershipTypeService
      .countMember(membershipType._id)
      .subscribe(count => {
        if (count === 0) {
          const confirmDeleteMsg = this.translateService.translate(
            'membership-type-delete-confirm',
            [membershipType.name]
          );
          this.exDlg.openConfirm(confirmDeleteMsg).subscribe(result => {
            if (result) {
              this.membershipTypeService
                .deleteMembershipType(membershipType._id, '')
                .subscribe(() => {
                  this.refreshAfterDelete();
                });
            }
          });
        } else {
          if (this.accumulateTypes.length + this.internalTypes.length === 1) {
            const warningDeleteMsg = this.translateService.translate(
              'membership-type-delete-warning-one-type',
              membershipType.name,
              count
            );
            this.exDlg.openMessage(warningDeleteMsg);
            return;
          }
          this.exDlg
            .openPrime(MembershipTypeDeleteConfirmationComponent, {
              callerData: {
                memberCount: count,
                membershipType
              }
            })
            .subscribe(result => {
              if (result) {
                this.refreshAfterDelete();
              }
            });
        }
      });
  }

  private refreshAfterDelete() {
    this.notification.showSuccess(this.deleteSuccessMsg);
    this.getMembershipTypes();
  }

  private getMembershipTypes() {
    this.membershipTypeService
      .getMembershipTypes()
      .subscribe(membershipTypes => {
        membershipTypes = map(membershipTypes, (type: MembershipType) => {
          if (
            !isNullOrEmptyOrUndefined(type.nonBenefits) &&
            !isNullOrEmptyOrUndefined(type.staticBenefits)
          ) {
            type.benefits = type.staticBenefits.map(m => m.campaignName).concat(type.nonBenefits);
          } else if (!isNullOrEmptyOrUndefined(type.nonBenefits)) {
            type.benefits = type.nonBenefits;
          } else if (!isNullOrEmptyOrUndefined(type.staticBenefits)) {
            type.benefits = type.staticBenefits.map(m => m.campaignName);
          }
          return type;
        });

        this.accumulateTypes = sortBy(
          filter(
            membershipTypes,
            (mt: MembershipType) => mt.isAccumulated === true
          ),
          MembershipType.Fields.POINT
        );

        this.internalTypes = sortBy(
          filter(membershipTypes, (mt: MembershipType) => !mt.isAccumulated),
          MembershipType.Fields.POINT
        );
      });
  }
}
