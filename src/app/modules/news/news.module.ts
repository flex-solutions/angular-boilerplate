import { NgModule } from '@angular/core';
import { NewsModuleComponents } from './components';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { FormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';

@NgModule({
  imports: [CommonModule, NewsRoutingModule, FormsModule, UICommonModule],
  declarations: [...NewsModuleComponents]
})
export class NewsModule {}
