import { NgModule } from '@angular/core';
import { DialogHostComponent } from './components/dialog-host.component';
import { DialogMainComponent } from './components/dialog-main.component';
import { DraggableDirective } from './directives/draggable.directive';
import { VerticalCenterDirective } from './directives/vertical-center.directive';
import { FocusBlurDirective } from './directives/focus-blur.directive';
import { DialogIconDirective } from './directives/dialog-icon.directive';
import { BasicDialogComponent } from './components/basic-dialog.component';
import { DialogService } from './services/dialog.service';
import { ExDialog } from './services/ex-dialog.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DialogHostComponent,
    DialogMainComponent,
    DraggableDirective,
    VerticalCenterDirective,
    FocusBlurDirective,
    DialogIconDirective,
    BasicDialogComponent
  ],
  providers: [DialogService, ExDialog],
  imports: [CommonModule],
  exports: [BasicDialogComponent, FocusBlurDirective],
  entryComponents: [
    DialogHostComponent,
    DialogMainComponent,
    // SW: also need to declare these items as entryComponent.
    BasicDialogComponent
  ]
})
export class DialogModule {}
