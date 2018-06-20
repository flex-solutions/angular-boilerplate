import { PromotionPipes } from './pipes/index';
import { PromotionDirectives } from './directives/index';
import { PromotionService } from './services/promotion.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { PromotionModuleComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UICommonModule
  ],
  providers: [PromotionService],
  declarations: [
    ...PromotionModuleComponents,
    ...PromotionDirectives,
    ...PromotionPipes
  ]
})
export class PromotionsModule { }
