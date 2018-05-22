import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';
import { DialogModule } from './modal/dialog.module';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    LoaderComponent, DialogModule
  ],
  declarations: [
    LoaderComponent,
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
