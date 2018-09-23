import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../../vouchers/services/vouchers.service';
import { StartStopPromotionService } from './../../services/start-stop-promotion.service';
import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { DropifyComponent } from './../../../../shared/ui-common/dropify/dropify.component';
import { Location } from '@angular/common';
import { isNil } from 'ramda';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Promotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { ActivatedRoute, Params } from '@angular/router';
import { TynimceEditorComponent } from '../../../../shared/ui-common/tinymce-editor/tinymce-editor.component';
import { convertStringToBase64 } from '../../../../utilities/convertStringToBase64';
import { promotionLimits } from '../../common.const';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { UTF8Encoding } from '../../../../utilities/ utf8-regex';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {
  // Properties
  cardTitle: string;
  cardSubTitle: string;
  currentStep: WizardStep;
  promotion: Promotion;
  contentInvalid: boolean;
  titleInvalid: boolean;
  selectedVoucherInvalid: boolean;
  isCreateAnother: boolean;
  isBlurEditor: boolean;
  promotionId: string;
  rawContent: string;
  notificationMessage: string;
  applyDays = 30;

  // For editable mode
  isEditableMode: boolean;
  isFinishedContentComponent = false;

  vouchers: Voucher[] = [];
  selectedVoucher: Voucher = new Voucher();

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;

  @ViewChild(DropifyComponent)
  private dropifyComponent: DropifyComponent;

  @ViewChild(TynimceEditorComponent)
  private tynimceEditor: TynimceEditorComponent;

  @ViewChild(MemberHomeComponent)
  membersList: MemberHomeComponent;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _activeRoute: ActivatedRoute,
    private _promotionService: PromotionService,
    private _notificationService: NotificationService,
    private _location: Location,
    private _startStopPromotionHandler: StartStopPromotionService,
    private readonly voucherService: VoucherService
  ) {
    this.promotion = new Promotion();
    this.titleInvalid = false;
    this.contentInvalid = false;
    this.isEditableMode = false;
    this.isCreateAnother = false;
    this.selectedVoucherInvalid = false;
  }
  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      this.promotionId = params['id'] ? params['id'] : null;
      this.isEditableMode = this.promotionId ? true : false;

      this.resolveTitle();
    });
    this.getCampaignVoucher();
  }

  // Resolve multilingual message for app card title and sub title
  private resolveTitle() {
    if (!this.isEditableMode) {
      this.cardTitle = this.translateService.translate(
        MessageConstant.CreatePromotionTitle
      );
      this.cardSubTitle = this.translateService.translate(
        MessageConstant.CreatePromotionDescription
      );
    } else {
      this.cardTitle = this.translateService.translate(
        MessageConstant.EditPromotionTitle
      );
      this.cardSubTitle = this.translateService.translate(
        MessageConstant.EditPromotionDescription
      );
    }
  }

  // Load promotion info from server
  private loadPromotion(promotionId) {
    if (!this.isFinishedContentComponent) {
      return;
    }
    if (this.isEditableMode) {
      this._promotionService.getPromotion(promotionId).subscribe(p => {
        this.promotion = p as Promotion;
        this.promotion.banner = convertStringToBase64(this.promotion.banner);
        this.applyDays = this.promotion.valid_date_count;
        if (!isNullOrEmptyOrUndefined(this.promotion.voucher)) {
          this.selectedVoucher = this.promotion.voucher;
          this.notificationMessage = this.promotion.voucher.notificationMessage;
        }

        if (isNullOrEmptyOrUndefined(this.promotion.start_date)) {
          Object.assign(
            this.membersList.memberFilter,
            this.promotion.member_filter
          );
          this.membersList.loadData();
        }
      });
    }
  }

  private getCampaignVoucher() {
    this.voucherService.getAllVoucherCareCampaign().subscribe(vouchers => {
      this.vouchers = vouchers;
    });
  }

  onFinishAndStart() {
    // Create promotion
    this.updateCustomerCareCampaignModel();
    this._promotionService
      .create(this.promotion)
      .subscribe((createdPromotion: Promotion) => {
        this.showNotification(MessageConstant.CreatePromotionSuccess);
        this._startStopPromotionHandler.startPromotion(createdPromotion, () => {
          this.onHandleCreateSuccess();
        });
      });
  }

  onWizardCancel() {
    this._location.back();
  }

  onWizardFinish() {
    this.updateCustomerCareCampaignModel();

    if (this.isEditableMode) {
      // Update promotion
      this._promotionService.update(this.promotion).subscribe(() => {
        this.showNotification(MessageConstant.UpdatePromotionSuccess);
      });
    } else {
      // Create promotion
      this._promotionService.create(this.promotion).subscribe(() => {
        this.showNotification(MessageConstant.CreatePromotionSuccess);
        this.onHandleCreateSuccess();
      });
    }
  }

  beforeNextStep1() {
    this.titleInvalid = false;
    this.contentInvalid = false;
    // Content is empty
    if (!this.promotion.content || this.promotion.content === '') {
      this.contentInvalid = true;
    }

    // Title is empty
    if (!this.promotion.title || this.promotion.title === '') {
      this.titleInvalid = true;
    }

    this.wizardComponent.selectedStep.canNext =
      !this.contentInvalid && !this.titleInvalid;
  }

  beforeNextStep2() {
    this.selectedVoucherInvalid = false;
    if (isNullOrEmptyOrUndefined(this.selectedVoucher) || isNullOrEmptyOrUndefined(this.selectedVoucher._id)) {
      this.selectedVoucherInvalid = true;
    }
    this.wizardComponent.selectedStep.canNext = !this.selectedVoucherInvalid;
  }

  onStepChanged(step: WizardStep) {
    this.currentStep = step;
  }

  onHtmlEditorChange(htmlContent) {
    this.promotion.content = htmlContent;
    this.contentInvalid = isNil(htmlContent) || htmlContent === '';
  }

  get titleError() {
    return this.translateService.translate(MessageConstant.RequireTitle);
  }

  onTitleChange($event) {
    this.titleInvalid = false;
  }

  private showNotification(messageKey) {
    const message = this.translateService.translate(messageKey);
    this._notificationService.showSuccess(message);
  }

  onTinyEditorBlur(event: any) {
    this.isBlurEditor = event;
  }

  isTinymceContentEmpty() {
    return (
      (isNil(this.promotion.content) || this.promotion.content === '') &&
      this.isBlurEditor
    );
  }

  private onHandleCreateSuccess() {
    if (this.isCreateAnother) {
      this.promotion = new Promotion();
      // Reset dropify control
      this.dropifyComponent.reset();
      // Reset tinymce control
      this.tynimceEditor.reset();
      // Reset wizard
      this.wizardComponent.reset();
    } else {
      this._location.back();
    }
  }

  finishContentComponent() {
    this.isFinishedContentComponent = true;
    setTimeout(() => this.loadPromotion(this.promotionId));
  }

  onSelectedVoucherChanged() {
    if (this.selectedVoucher) {
      this.selectedVoucherInvalid = false;
      this.notificationMessage = this.selectedVoucher.notificationMessage;
    }
  }

  private ValidateRawContent(): string {
    if (this.rawContent.length > promotionLimits.BRIEF_LENGTH) {
      return `${this.rawContent.substring(0, promotionLimits.BRIEF_LENGTH)}...`;
    }

    return this.rawContent;
  }

  private updateCustomerCareCampaignModel() {
    this.promotion.brief_content = this.ValidateRawContent();
    this.promotion.member_filter = this.membersList.memberFilter;
    this.promotion.valid_date_count = this.applyDays;
    this.promotion.voucher = this.selectedVoucher;
    if (!isNullOrEmptyOrUndefined(this.promotion.voucher)) {
      this.promotion.voucher.notificationMessage = this.notificationMessage;
    }
  }
}
