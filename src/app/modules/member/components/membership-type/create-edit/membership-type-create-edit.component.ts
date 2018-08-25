import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from './../../../../../shared/services/translate.service';
import { MembershipType } from './../../../../../shared/models/membership-type.model';
import { MembershipTypeService } from './../../../services/membership-type.service';
import { OnInit, Component, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../../shared/abstract/abstract-form-component';
import * as _ from 'lodash';
declare let $: any;

@Component({
  selector: 'app-membership-type-create-edit',
  templateUrl: './membership-type-create-edit.component.html',
  styles: []
})
export class MembershipTypeCreateEditComponent extends AbstractFormComponent
  implements OnInit, AfterViewInit {
  public membershipType: MembershipType = new MembershipType();
  membershipTypeId: string;
  benefits: string[] = [];
  inputBenefit: string;
  vouchers: any[];
  selectedVouchers: any[] = [];
  validDateCount: 30;

  public errors = {
    membershipTypeCode: [
      {
        type: 'required',
        message: 'membership-type-create-form-code-required'
      },
      {
        type: 'pattern',
        message: 'membership-type-create-form-code-pattern'
      }
    ],
    membershipTypeName: [
      {
        type: 'required',
        message: 'membership-type-create-form-name-required'
      }
    ]
  };

  createSuccessMsg: string;
  public cardTitle: string;
  public cardDescription: string;

  constructor(
    private readonly membershipTypeService: MembershipTypeService,
    public readonly translateService: TranslateService,
    private formbuilder: FormBuilder,
    private location: Location,
    private notification: NotificationService,
    activatedRoute: ActivatedRoute
  ) {
    super();
    activatedRoute.params.subscribe((params: Params) => {
      this.membershipTypeId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      if (this.isEdit) {
        this.cardTitle = this.translateService.translate(
          'membership-type-update-title'
        );
        this.cardDescription = this.translateService.translate(
          'membership-type-update-sub-title'
        );
      } else {
        this.cardTitle = this.translateService.translate(
          'membership-type-create-title'
        );
        this.cardDescription = this.translateService.translate(
          'membership-type-create-sub-title'
        );
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.createSuccessMsg =
      this.isEdit === false
        ? this.translateService.translate('membership-type-create-form-success')
        : this.translateService.translate('membership-type-edit-form-success');
    this.getMembershipTypeInfoForEdit();
  }

  ngAfterViewInit() {
    if ($('#editable-form').length) {
      $.fn.editable.defaults.mode = 'inline';
      $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-primary btn-sm editable-submit">' +
        '<i class="mdi mdi-add-circle-add"></i>' +
        '</button>' +
        '<button type="button" class="btn btn-default btn-sm editable-cancel">' +
        '<i class="mdi mdi-close-circle-outline"></i>' +
        '</button>';

      $('.validDateCount').editable({});
    }
    setTimeout(() => {
      this.vouchers = [
        { id: 'Sun', name: 'Giảm 30% ngay sau khi đăng ký' },
        { id: 'Mon', name: 'Mua 1 tặng 1 khi tích lũy được 25 điểm' },
        { id: 'Tue', name: 'Miễn phí 1 ly nước khi nâng hạng ' },
        { id: 'Wed', name: 'Miễn phí 1 ly nước mỗi khi tích lũy đủ 50 điểm' },
        { id: 'Thu', name: 'Miễn phí 1 ly nước khi nâng hạng' },
        { id: 'Fri', name: 'Một phần bánh miễn phí trong ngày sinh nhật' },
        { id: 'Sat', name: 'Miễn phí 1 ly nước mỗi khi tích lũy được 50 điểm' }
      ];
    });
  }

  get membershipTypeCode() {
    return this.formGroup.get('membershipTypeCode');
  }

  get membershipTypeName() {
    return this.formGroup.get('membershipTypeName');
  }

  get membershipTypePoint() {
    return this.formGroup.get('membershipTypePoint');
  }

  protected onSubmit() {
    if (this.isEdit === true) {
      this.membershipTypeService.update(this.membershipType).subscribe(() => {
        this.notification.showSuccess(this.createSuccessMsg);
        this.onCancel();
      });
    } else {
      this.membershipTypeService.create(this.membershipType).subscribe(() => {
        this.notification.showSuccess(this.createSuccessMsg);
        this.finish();
      });
    }
  }
  protected onCancel() {
    this.location.back();
  }

  protected onCreateForm() {
    super.onCreateForm();
    this.formGroup = this.formbuilder.group({
      membershipTypeCode: [
        '',
        [Validators.required, Validators.pattern(/^\S*$/)]
      ],
      membershipTypeName: ['', [Validators.required]],
      membershipTypePoint: ['']
    });
  }

  protected resetForm() {
    super.resetForm();
    this.membershipType = new MembershipType();
  }

  private getMembershipTypeInfoForEdit() {
    if (this.isEdit === true) {
      this.membershipTypeService
        .getMembershipType(this.membershipTypeId)
        .subscribe(membershipType => {
          this.membershipType = membershipType;
        });
    }
  }

  addNonBenefit() {
    this.benefits.push(this.inputBenefit);
    this.inputBenefit = '';
  }

  removeNonBenefit(benefit: string) {
    this.benefits = _.remove(this.benefits, val => {
      return val === benefit;
    });
  }
}
