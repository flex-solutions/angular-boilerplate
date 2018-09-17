import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { components } from './component';
import { PosAndMenuRoutingModule } from './routing.module';
import { POSService } from './services/pos';
import { pipes } from './pipe';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PosAndMenuRoutingModule,
      UICommonModule
    ],
    declarations: [
        ...components,
        ...pipes,
    ],
    providers: [POSService],
  })

  export class PosAndMenuModule { }
