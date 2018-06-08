import { ViewService } from './services/view.service';

import { CreateEditViewComponent } from './components/create-edit-views/create-edit-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewModuleComponents } from './components';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...ViewModuleComponents
  ],
  providers: [ViewService],

})
export class ViewModule { }
