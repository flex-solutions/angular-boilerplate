import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemoRoutingModule } from './modal-demo-routing.module';
import { ModalDemoComponent } from './demo/modal-demo.component';

@NgModule({
  imports: [CommonModule, ModalDemoRoutingModule],
  declarations: [ModalDemoComponent],
  providers: []
})
export class ModalDemoModule {}
