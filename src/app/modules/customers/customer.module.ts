import { CustomerService } from './services/customer.service';
import { CustomerRoutingModule } from './customer.module.routing';
import { customerComponents } from './components/index';
import { UICommonModule } from './../../shared/ui-common/ui-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
      CommonModule, CustomerRoutingModule,
      FormsModule, ReactiveFormsModule,
      UICommonModule
    ],
    declarations: [
        ...customerComponents
    ],
    providers: [
      CustomerService
    ],

  })

  export class CustomerManagementModule { }
