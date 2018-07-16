import { NewsRoutingModule } from './news-routing.module';
import { NewsService } from './services/news.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsModuleComponents } from './components';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { NewsDirective } from './directives';
import { NewsPipes } from './pipes';

@NgModule({
  imports: [
    CommonModule, NewsRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [
    ...NewsDirective,
    ...NewsModuleComponents,
    ...NewsPipes
  ],
  providers: [NewsService],

})

export class NewsModule { }
