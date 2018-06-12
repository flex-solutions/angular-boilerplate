import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PromotionsRoutingModule
  ],
  declarations: [
    CreatePromotionComponent
  ]
})
export class PromotionsModule { }
