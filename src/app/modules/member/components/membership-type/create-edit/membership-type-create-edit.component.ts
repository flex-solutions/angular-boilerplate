import { Guid } from 'guid-typescript';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from './../../../../../shared/services/translate.service';
import {
  MembershipType,
  BenefitScheduleType,
  VoucherBenefit
} from './../../../../../shared/models/membership-type.model';
import { MembershipTypeService } from './../../../services/membership-type.service';
import { OnInit, Component, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../../shared/abstract/abstract-form-component';
import * as _ from 'lodash';

import { Voucher } from '../../../../../shared/models/voucher.model';
import { isNullOrEmptyOrUndefined } from '../../../../../utilities/util';

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
  vouchers: Voucher[] = [];
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
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadMembershipInfo();
  }
  async loadMembershipInfo() {
    const vouchers = (await this.membershipTypeService
      .getAllVoucherCareCampaign()
      .toPromise()) as any[];
    this.vouchers = vouchers;
    await this.getMembershipTypeInfoForEdit();
    if (this.membershipType.staticBenefits) {
      this.selectedVouchers = this.membershipType.staticBenefits;
    }
    if (this.membershipType.nonBenefits) {
      this.benefits = this.membershipType.nonBenefits;
    }
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
    this.fillBenefitToMembershipType();
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

  private async getMembershipTypeInfoForEdit() {
    if (this.isEdit === true) {
      const tMembershipType = await this.membershipTypeService
        .getMembershipType(this.membershipTypeId)
        .toPromise();
      this.membershipType = tMembershipType;
      if (this.membershipType.staticBenefits) {
        this.membershipType.staticBenefits = _.map(
          this.membershipType.staticBenefits,
          (val: VoucherBenefit, key: string) => {
            val.voucherBenefitId = Guid.create().toString();
            val.voucherCode = _.get(val.voucher, 'code', null);
            val.voucherName = _.get(val.voucher, 'name', null);
            return val;
          }
        );
      }
    }
  }

  addNonBenefit() {
    if (this.inputBenefit) {
      this.benefits.push(this.inputBenefit);
      this.inputBenefit = '';
    }
  }

  removeNonBenefits(benefit: string) {
    _.remove(this.benefits, val => {
      return val === benefit;
    });
  }

  removeVoucherBenefit(selectedVoucher: VoucherBenefit) {
    const copySelectedVouchers = _.map(this.selectedVouchers, _.clone);
    _.remove(copySelectedVouchers, (val: VoucherBenefit) => {
      return val.voucherBenefitId === selectedVoucher.voucherBenefitId;
    });
    this.selectedVouchers = copySelectedVouchers;
  }

  private fillBenefitToMembershipType() {
    this.membershipType.nonBenefits = this.benefits;
    this.membershipType.staticBenefits = this.selectedVouchers;
  }

  onSelectedVoucherChanged($event: Voucher, selectedVoucher: VoucherBenefit) {
    if (!isNullOrEmptyOrUndefined($event)) {
      const currentSelectedBenefit = this.selectedVouchers.find(
        i => i.voucherBenefitId === selectedVoucher.voucherBenefitId
      );
      if (currentSelectedBenefit) {
        currentSelectedBenefit.voucher = $event;
        if (isNullOrEmptyOrUndefined(currentSelectedBenefit.campaignName)) {
          currentSelectedBenefit.campaignName = $event.name;
        }
      }
    }
  }

  addSelectedVoucher() {
    const benefit = new VoucherBenefit();
    benefit.voucherBenefitId = Guid.create().toString();
    benefit.validDateCount = 30;
    benefit.schedule = BenefitScheduleType.ReachRank;
    this.selectedVouchers.push(benefit);
  }
}
