import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { components } from './component';
import { PosAndMenuRoutingModule } from './routing.module';
import { POSService } from './services/pos';
import { pipes } from './pipe';
import { PosDirectives } from './directives/index';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PosAndMenuRoutingModule, UICommonModule, PopoverModule.forRoot()],
    declarations: [...components, ...pipes, ...PosDirectives],
    providers: [POSService]
})
export class PosAndMenuModule {}
