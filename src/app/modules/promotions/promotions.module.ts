import { PromotionService } from './services/promotion.service';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { DetailPromotionComponent } from './components/detail-promotion/detail-promotion/detail-promotion.component';

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
    CreatePromotionComponent,
    DetailPromotionComponent
  ]
})
export class PromotionsModule { }
