import { PromotionFilter } from './promotion-filter.model';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { AbstractFilterComponent } from './abstract-filter.component';
import { SelectableModel } from '../../../../shared/models/selectable.model';
import { StatusCheckedItem } from '../../interfaces/promotion';
import { PromotionStatus } from '../../directives/promotion-status.directive';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { DatePickerComponent } from '../../../../shared/ui-common/datepicker/date-picker/date-picker.component';

@Component({
  selector: 'app-promotion-filter',
  templateUrl: './promotion-filter.component.html',
  styleUrls: ['./promotion-filter.component.css']
})
export class PromotionFilterComponent extends AbstractFilterComponent<
  PromotionFilter
> {
  statusItems: SelectableModel<StatusCheckedItem>[];
  selectedStatus: StatusCheckedItem[];
  @ViewChildren(DatePickerComponent) datePickerControls: QueryList<DatePickerComponent>;

  constructor(private readonly translateService: TranslateService) {
    super();
    this.buildStatusItemSource();
  }

  onResetFilter() {
    this.filter = new PromotionFilter();
    this.datePickerControls.forEach(c => c.reset());
    this.buildStatusItemSource();
  }

  onRunFilter() {
    this.filter.status = this.getSelectedStatus();
  }

  buildStatusItemSource() {
    this.selectedStatus = [];
    this.statusItems = [
      {
        isSelected: true,
        model: {
          status: PromotionStatus.New,
          displayName: this.translateService.translate(
            MessageConstant.NewStatus
          )
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Active,
          displayName: this.translateService.translate(
            MessageConstant.ActiveStatus
          )
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Deactivated,
          displayName: this.translateService.translate(
            MessageConstant.DeactivedStatus
          )
        }
      }
    ];
  }

  getSelectedStatus() {
    const selectedStatus = this.statusItems
      .filter(i => i.isSelected)
      .map(m => m.model.status);
    return selectedStatus;
  }
}
