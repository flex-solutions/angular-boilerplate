import { TranslateService } from './../../../../shared/services/translate.service';
import { Promotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MessageConstant } from '../../messages';

@Component({
  selector: 'app-start-promotion',
  templateUrl: './start-promotion.component.html',
  styleUrls: ['./start-promotion.component.css']
})
export class StartPromotionComponent extends DialogComponent implements OnInit {

  description: string;
  dateRange: DateRangeModel;
  promotion: Promotion;

  constructor(protected dialogService: DialogService, private promotionService: PromotionService,
    private translateService: TranslateService, private notification: NotificationService) {
    super(dialogService);
    this.dateRange = new DateRangeModel();
    this.dateRange.startDate = new Date();
    this.dateRange.endDate = new Date();
  }

  ngOnInit() {
    // Clone promotion
    const selectPromotion = {};
    Object.assign(selectPromotion, this.callerData);
    this.promotion = (selectPromotion as Promotion);
    // Build description
    this.description = this.translateService.translateWithParams('promotions-start-promotion-h5-start_description',
      this.promotion.title);
  }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    this.promotion.start_date = this.dateRange.startDate;
    this.promotion.expire_date = this.dateRange.endDate;
    this.promotionService.start(this.promotion._id, this.promotion).subscribe(response => {
      this.result = true;
      this.notification.showSuccess(this.translateService.translate(MessageConstant.StartSuccessMessage));
      this.dialogResult();
    });
  }
}
