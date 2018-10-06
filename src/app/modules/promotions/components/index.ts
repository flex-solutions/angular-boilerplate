import { PushNotificaionComponent } from './push-notification/component';
import { PromotionFilterComponent } from './promotion-filter/promotion-filter.component';
import { StartPromotionComponent } from './start-promotion/start-promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';
import { GiveVoucherComponent } from './give-voucher/component';

export const PromotionModuleComponents = [
    CreatePromotionComponent,
    PromotionsComponent,
    DetailPromotionComponent,
    StartPromotionComponent,
    PromotionFilterComponent,
    GiveVoucherComponent,
    PushNotificaionComponent
];

export const PromotionsModuleEntryComponents = [
    StartPromotionComponent
];
