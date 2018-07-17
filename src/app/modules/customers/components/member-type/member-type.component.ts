import { TranslateService } from './../../../../shared/services/translate.service';
import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberTypeService } from './../../services/member-type.service';
import { MemberType } from './../../../../shared/models/member-type.model';
import { OnInit, Component } from '@angular/core';
import { MemberTypeRoute } from '../../constants/customer.constants';

@Component({
  selector: 'app-member-type-home',
  templateUrl: './member-type.component.html',
  styleUrls: ['member-type.component.css']
})
export class MemberTypeHomeComponent implements OnInit {

  public memberTypes: MemberType[] = [];
  private confirmDeleteMsg: string;
  private deleteSuccessMsg: string;

  constructor(private readonly memberTypeService: MemberTypeService,
  private readonly router: Router,
  private readonly activatedRoute: ActivatedRoute,
  private readonly notification: NotificationService,
  private readonly exDlg: ExDialog,
  private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.getMemberTypes();
  }

  createNewMemberType() {
    this.router.navigate([MemberTypeRoute.CREATE], { relativeTo: this.activatedRoute });
  }

  editMemberType(id: string) {
    this.router.navigate([MemberTypeRoute.UPDATE, id], { relativeTo: this.activatedRoute });
  }

  deleteMemberType(memberType: MemberType) {

    this.confirmDeleteMsg = this.translateService.translate('member-type-delete-confirm', [memberType.name]);
    this.deleteSuccessMsg = this.translateService.translate('member-type-delete-success');
    this.exDlg.openConfirm(this.confirmDeleteMsg).subscribe(result => {
      if (result) {
        this.memberTypeService.deleteMemberType(memberType._id).subscribe(() => {
          this.notification.showSuccess(this.deleteSuccessMsg);
          this.getMemberTypes();
        });
      }
    });

  }

  private getMemberTypes() {
    this.memberTypeService.getMemberTypes().subscribe(memberTypes => {
      this.memberTypes = memberTypes;
    });
  }
}
