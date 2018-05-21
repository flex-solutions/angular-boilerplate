import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { ModalComponent } from './modal/modal.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    LoaderComponent
  ],
  declarations: [
    ModalComponent,
    LoaderComponent,
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
