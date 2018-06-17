import { NewsRoutingModule } from './news-routing.module';
import { NewsService } from './services/news.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsModuleComponents } from './components';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { NewsStatusDirective } from './directives/news-status.directive';
import { NewsActionButtonDirective } from './directives/news-action-button.directive';

@NgModule({
  imports: [
    CommonModule, NewsRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [
    ...NewsModuleComponents,
    NewsStatusDirective,
    NewsActionButtonDirective
  ],
  providers: [NewsService],

})
export class NewsModule { }
