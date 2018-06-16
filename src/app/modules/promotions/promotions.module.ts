import { PromotionsComponent } from './components/promotions/promotions.component';
import { StartButtonDirective } from './directives/start-button.directive';
import { PromotionService } from './services/promotion.service';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { PromotionStatusDirective } from './directives/promotion-status.directive';

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
    PromotionStatusDirective,
    StartButtonDirective,
    PromotionsComponent
  ]
})
export class PromotionsModule { }
