import { memberModuleServices } from './services';
import { memberModuleDirectives } from './directives';
import { MemberRoutingModule } from './member.module.routing';
import { memberComponents } from './components';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
      CommonModule, MemberRoutingModule,
      FormsModule, ReactiveFormsModule,
      SharedModule,
      UICommonModule
    ],
    declarations: [
        ...memberComponents,
        ...memberModuleDirectives
    ],
    providers: [
      memberModuleServices
    ],

  })

  export class MemberModule { }
