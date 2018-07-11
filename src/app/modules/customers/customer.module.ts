import { customerModuleServices } from './services';
import { customerModuleDirectives } from './directives';
import { CustomerRoutingModule } from './customer.module.routing';
import { customerComponents } from './components';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
      CommonModule, CustomerRoutingModule,
      FormsModule, ReactiveFormsModule,
      SharedModule,
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
