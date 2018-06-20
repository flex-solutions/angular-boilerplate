import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardStep } from '../../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { WizardComponent } from '../../../../../shared/ui-common/wizard/wizard/wizard.component';
import { TranslateService } from '../../../../../shared/services/translate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PromotionService } from '../../../services/promotion.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { Promotion } from '../../../interfaces/promotion';
import * as moment from 'moment';
import { promotionRoute } from '../../../common.const';

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
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.promotion = new Promotion();
    this.wizardComponent.isEnableBackButton = false;
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
}
