import { log } from 'util';
import { Voucher } from './../../../../../shared/models/voucher.model';
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
import { VoucherBenefit, BenefitScheduleType } from './voucher.model';

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
  vouchers: VoucherBenefit[] = [];
  selectedVouchers: VoucherBenefit[] = [];
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
    this.membershipTypeService
      .getAllVoucherCareCampaign()
      .subscribe((vouchers: Voucher[]) => {
        const benefitVouchers = [];
        for (const v of vouchers) {
          benefitVouchers.push({
            campaignName: v.name,
            voucher: v,
            voucherCode: v.code,
            voucherName: v.name,
            validDateCount: 30,
            schedule: BenefitScheduleType.ReachRank
          });
        }
        this.vouchers = benefitVouchers;
      });
  }

  ngAfterViewInit() {}

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

  removeNonBenefits(benefit: string) {
    _.remove(this.benefits, val => {
      return val === benefit;
    });
  }

  removeVoucherBenefit(selectedVoucher: VoucherBenefit) {
    const copySelectedVouchers = _.map(this.selectedVouchers, _.clone);
    _.remove(copySelectedVouchers, (val: VoucherBenefit) => {
      return val.voucherCode === selectedVoucher.voucherCode;
    });
    this.selectedVouchers = copySelectedVouchers;
  }
}
