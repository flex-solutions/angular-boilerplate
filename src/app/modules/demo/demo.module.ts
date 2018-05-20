import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './services/demo.service';

@NgModule({
  imports: [CommonModule, DemoRoutingModule],
  declarations: [DemoComponent],
  providers: [DemoService]
})
export class DemoModule {}
