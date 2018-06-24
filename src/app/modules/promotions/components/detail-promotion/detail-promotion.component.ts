import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardStep } from '../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { WizardComponent } from '../../../../shared/ui-common/wizard/wizard/wizard.component';
import { TranslateService } from '../../../../shared/services/translate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PromotionService } from '../../services/promotion.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Promotion } from '../../interfaces/promotion';
import * as moment from 'moment';
import { promotionRoute } from '../../common.const';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { Location } from '@angular/common';
import { MessageConstant } from '../../messages';
import { StartStopPromotionService } from '../../services/start-stop-promotion.service';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.css']
})
export class DetailPromotionComponent implements OnInit {

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;

  currentStep: WizardStep;

  promotion: Promotion;

  constructor(
    protected translateService: TranslateService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private promotionService: PromotionService,
    private location: Location,
    private dialogManager: ExDialog,
    private notificationService: NotificationService,
    private startStopPromotionHandler: StartStopPromotionService) { }

  ngOnInit() {
    this.promotion = new Promotion();
    this.wizardComponent.isEnableCancelButton = false;
    this.activeRoute.params.subscribe((params: Params) => {
      const promotionId = params['id'] ? params['id'] : null;
      this.loadPromotion(promotionId);
    });
  }

  onStepChanged(step: WizardStep) {
    this.currentStep = step;
  }

  convertTime(date: any): string {
    return moment(date).fromNow();
  }

  navigateToEdit(id: string) {
    this.router.navigate([`${promotionRoute.EDIT}/${id}`]);
  }

  startStopPromotion() {
    this.startStopPromotionHandler.startStopPromotion(this.promotion, () => { this.loadPromotion(this.promotion._id); });
  }

  // Load promotion info from server
  private loadPromotion(promotionId) {
    this.promotionService.getPromotion(promotionId).subscribe(p => {
      this.promotion = p as Promotion;
      this.promotion.banner = atob(this.promotion.banner);
      this.promotion.create_on = this.convertTime(this.promotion.create_on);
      this.promotion.edit_on = this.convertTime(this.promotion.edit_on);
      if (this.promotion.edit_on === 'Invalid date') {
        this.promotion.edit_on = '';
      }
    });
  }

  deletePromotion(model: Promotion) {
    const confirmMsg = this.translateService.translateWithParams(MessageConstant.DeleteConfirmation, model.title);
    const confirmTitle = this.translateService.translateWithParams(MessageConstant.DeleteTitle);
    this.dialogManager.openConfirm(confirmMsg, confirmTitle).subscribe(result => {
      if (result) {
        const successMessage = this.translateService.translate(MessageConstant.DeleteSuccessfullyNotification);
        this.promotionService.deletePromotion(model._id).subscribe(res => {
          this.notificationService.showSuccess(successMessage);
          this.location.back();
        });
      }
    });
  }
}
