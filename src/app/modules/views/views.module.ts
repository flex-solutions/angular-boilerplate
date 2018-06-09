import { ViewsRoutingModule } from './views-routing.module';
import { ViewService } from './services/view.service';

import { CreateEditViewComponent } from './components/create-edit-views/create-edit-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewModuleComponents } from './components';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';


@NgModule({
  imports: [
    CommonModule, ViewsRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [
    ...ViewModuleComponents
  ],
  providers: [ViewService],

})
export class ViewsModule { }
