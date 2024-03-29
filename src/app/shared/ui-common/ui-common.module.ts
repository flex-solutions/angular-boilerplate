import { BooleanStatusCtrlDirective } from './directives/ boolean-status-ctrl.directive';
import { DateRangePickerComponent } from './datepicker/date-range-picker/date-range-picker.component';
import { WizardStepComponent } from './wizard/wizard-step/wizard-step.component';
import { WizardComponent } from './wizard/wizard/wizard.component';
import { DropifyComponent } from './dropify/dropify.component';
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
import { TynimceEditorComponent } from './tinymce-editor/tinymce-editor.component';
import { DatePickerComponent } from './datepicker/date-picker/date-picker.component';
import { DropDownCheckBoxesComponent } from './drop-down-check-boxes/drop-down-check-boxes.component';
import { InputRangeComponent } from './input-range/input-range.component';
import { Select2Component } from './select2/select2.component';
import { Select2MultipleComponent } from './select2/select2-multiple.component';
import { AddressService } from './address/address.service';
import { AddressComponent } from './address/address.component';
import { InputEditableInlineComponent } from './input-editable-inline/input-editable-inline.component';
import { InputNumberDirective } from './directives/input-number.directive';
import { ImgBinaryDirective } from './directives/img-binary.directive';
import { INJECT_TOKEN } from './const';
import { LoadingElementDirective } from './loading-bar/loading-element.directive';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LoaderComponent,
    CardComponent,
    SearchTextboxComponent,
    TynimceEditorComponent,
    DialogModule,
    DatagridModule,
    PaginationModule,
    DropifyComponent,
    WizardComponent,
    WizardStepComponent,
    DateRangePickerComponent,
    DatePickerComponent,
    DropDownCheckBoxesComponent,
    InputRangeComponent,
    Select2Component,
    Select2MultipleComponent,
    BooleanStatusCtrlDirective,
    ImgBinaryDirective,
    AddressComponent,
    InputEditableInlineComponent,
    InputNumberDirective,
    LoadingElementDirective
  ],
  declarations: [
    LoaderComponent,
    CardComponent,
    SearchTextboxComponent,
    TynimceEditorComponent,
    DropifyComponent,
    WizardComponent,
    WizardStepComponent,
    DateRangePickerComponent,
    DatePickerComponent,
    DropDownCheckBoxesComponent,
    InputRangeComponent,
    Select2Component,
    Select2MultipleComponent,
    BooleanStatusCtrlDirective,
    ImgBinaryDirective,
    AddressComponent,
    InputEditableInlineComponent,
    InputNumberDirective,
    LoadingElementDirective
  ],
  providers: [{
    provide: INJECT_TOKEN.LOADING_INDICATOR,
    useValue: new LoaderService()
  }, AddressService, ]
})
export class UICommonModule {}
