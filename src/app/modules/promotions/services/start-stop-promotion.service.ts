import { TranslateService } from './../../../shared/services/translate.service';
import { Injectable } from '@angular/core';
import { Promotion } from '../interfaces/promotion';
import { PromotionService } from './promotion.service';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { StartPromotionComponent } from '../components/start-promotion/start-promotion.component';
import { MessageConstant } from '../messages';
import { PromotionStatus } from '../directives/promotion-status.directive';

@Injectable()
export class StartStopPromotionService {

    constructor(private service: PromotionService,
        private translateService: TranslateService,
        private dialogManager: ExDialog,
        private notificationService: NotificationService) { }

    startPromotion(promotion: Promotion, callback: () => void) {
        this.dialogManager
            .openPrime(StartPromotionComponent, { callerData: promotion })
            .subscribe(result => {
                if (result) {
                    callback();
                }
            });
    }

    stopPromotion(promotion: Promotion, callback: () => void) {
        const confirmMsg = this.translateService.translateWithParams(MessageConstant.StopPromotionDescription, promotion.title);
        const confirmTitle = this.translateService.translateWithParams(MessageConstant.StopPromotionTitle);
        this.dialogManager.openConfirm(confirmMsg, confirmTitle).subscribe(result => {
            if (result) {
                const successMessage = this.translateService.translate(MessageConstant.StopSuccessMessage);
                this.service.stop(promotion._id).subscribe(res => {
                    this.notificationService.showSuccess(successMessage);
                    callback();
                });
            }
        });
    }

    startStopPromotion(item: Promotion, callback: () => void) {
        switch (item.status) {
          case PromotionStatus.Active:
            this.stopPromotion(item,  callback);
            break;
          case PromotionStatus.New:
          case PromotionStatus.Deactivated:
            this.startPromotion(item, callback);
            break;
        }
      }
}
