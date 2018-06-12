import { WizardComponent } from './wizard/wizard/wizard.component';
import { SearchTextboxComponent } from './search-textbox/search-textbox.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';
import { DialogModule } from './modal/dialog.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { CardComponent } from './card/card.component';
import { PaginationModule } from './pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { WizardStepComponent } from './wizard/wizard-step/wizard-step.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LoaderComponent, CardComponent,
    SearchTextboxComponent,
    DialogModule, DatagridModule, PaginationModule
  ],
  declarations: [
    LoaderComponent,
    CardComponent,
    SearchTextboxComponent,
    WizardComponent,
    WizardStepComponent
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
