import { TranslateService } from './../../../../shared/services/translate.service';
import { Promotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MessageConstant } from '../../messages';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { MemberCriteriaBuilder } from '../../../member/components/member-filter/member-filter.builder';
import { MemberFilter } from '../../../../shared/models/member.model';
import { UTF8Encoding } from '../../../../utilities/ utf8-regex';

@Component({
  selector: 'app-start-promotion',
  templateUrl: './start-promotion.component.html',
  styleUrls: ['./start-promotion.component.css']
})
export class StartPromotionComponent extends DialogComponent implements OnInit {
  description: string;
  dateRange: DateRangeModel;
  promotion: Promotion;

  constructor(
    protected dialogService: DialogService,
    private promotionService: PromotionService,
    private translateService: TranslateService,
    private notification: NotificationService
  ) {
    super(dialogService);
    this.dateRange = new DateRangeModel();
    this.dateRange.startDate = new Date();
    this.dateRange.endDate = new Date();
  }

  ngOnInit() {
    // Clone promotion
    const selectPromotion = {};
    Object.assign(selectPromotion, this.callerData);
    this.promotion = selectPromotion as Promotion;
    // Build description
    this.description = this.translateService.translate(
      'promotions-start-promotion-h5-start_description',
      this.promotion.title
    );
  }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    const isFirstTimeStart = isNullOrEmptyOrUndefined(
      this.promotion.start_date
    );
    this.promotion.start_date = this.dateRange.startDate;
    this.promotion.expire_date = this.dateRange.endDate;

    if (isFirstTimeStart) {
      // At the first time started, we need convert the member filter object to member filter query at first
      const memberFilter = new MemberFilter();
      Object.assign(memberFilter, this.promotion.member_filter);
      const query = MemberCriteriaBuilder.build(memberFilter);
      this.promotionService
        .updateMemberFilter(
          this.promotion._id,
          UTF8Encoding.utf8Encode(JSON.stringify(query))
        )
        .subscribe(res => {
          this.promotionService
            .start(this.promotion._id, this.promotion)
            .subscribe(response => {
              this.result = true;
              this.notification.showSuccess(
                this.translateService.translate(
                  MessageConstant.StartSuccessMessage
                )
              );
              this.dialogResult();
            });
        });
    } else {
      this.promotionService
        .start(this.promotion._id, this.promotion)
        .subscribe(response => {
          this.result = true;
          this.notification.showSuccess(
            this.translateService.translate(MessageConstant.StartSuccessMessage)
          );
          this.dialogResult();
        });
    }
  }
}
