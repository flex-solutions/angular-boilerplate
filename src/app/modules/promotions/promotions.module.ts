import { StartStopPromotionService } from './services/start-stop-promotion.service';
import { PromotionPipes } from './pipes/index';
import { PromotionDirectives } from './directives/index';
import { PromotionService } from './services/promotion.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { PromotionModuleComponents, PromotionsModuleEntryComponents } from './components';
import { VouchersModule } from '../vouchers/vouchers.module';
import { MemberModule } from '../member/member.module';

@NgModule({
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UICommonModule,
    VouchersModule,
    MemberModule
  ],
  providers: [PromotionService, StartStopPromotionService],
  declarations: [
    ...PromotionModuleComponents,
    ...PromotionDirectives,
    ...PromotionPipes
  ],
  entryComponents: [
    ...PromotionsModuleEntryComponents
  ]
})
export class PromotionsModule { }
