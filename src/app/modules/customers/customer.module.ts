import { customerModuleServices } from './services/index';
import { customerModuleDirectives } from './directives/index';
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
        ...customerComponents,
        ...customerModuleDirectives
    ],
    providers: [
      customerModuleServices
    ],

  })

  export class CustomerManagementModule { }
