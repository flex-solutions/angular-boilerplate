import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemoRoutingModule } from './modal-demo-routing.module';
import { ModalDemoComponent } from './demo/modal-demo.component';
import { HostedModalComponent } from './demo/hosted-modal.component';

@NgModule({
  imports: [CommonModule, ModalDemoRoutingModule],
  declarations: [ModalDemoComponent, HostedModalComponent],
  providers: [],
  entryComponents: [HostedModalComponent]
})
export class ModalDemoModule {}
