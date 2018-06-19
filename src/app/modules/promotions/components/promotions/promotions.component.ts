import { isNil } from 'ramda';
import { SelectableModel } from './../../../../shared/models/selectable.model';
import { DateRangeModel, SingleDateModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { PromotionService } from './../../services/promotion.service';
import { Promotion } from './../../interfaces/promotion';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { PromotionRouting } from '../../messages';
import { CheckedItem } from '../../../../shared/ui-common/drop-down-check-boxes/checked-items.model';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  public items: Promotion[] = [];
  currentFilterArgs: IFilterChangedEvent;
  startDate: SingleDateModel;
  endDate: SingleDateModel;
  statusItems: SelectableModel<CheckedItem>[];

  constructor(private service: PromotionService, private route: Router) {
    this.startDate = new SingleDateModel();
    this.endDate = new SingleDateModel();
    this.buildStatusItemSource();
  }

  ngOnInit() {
  }

  public count = (searchKey: string) => {
    return this.service.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPromotions();
  }

  loadPromotions() {
    const pagination = this.currentFilterArgs.pagination;
    this.service
      .getPromotions(
        pagination.itemsPerPage,
        pagination.page,
        this.currentFilterArgs.searchKey
      )
      .subscribe((response: Promotion[]) => {
        this.items = response;
      });
  }

  onStartDateChanged($event) {
    this.startDate = $event;
    if (!isNil(this.startDate.date) && !isNil(this.endDate.date) && this.startDate.date.getTime() > this.endDate.date.getTime()) {
      this.endDate.date = this.startDate.date;
    }
  }

  onEndDateChanged($event) {
    this.endDate = $event;
    if (!isNil(this.startDate.date) && !isNil(this.endDate.date) && this.startDate.date.getTime() > this.endDate.date.getTime()) {
      this.endDate.date = this.startDate.date;
    }
  }

  navigateToCreate() {
    this.route.navigate([PromotionRouting.CREATE_PAGE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${PromotionRouting.EDIT_PAGE}/${id}`]);
  }

  startStopPromotion(id) {

  }

  buildStatusItemSource() {
    this.statusItems = [
      {
        isSelected: true,
        model: {
          displayName: 'New'
        }
      },
      {
        isSelected: true,
        model: {
          displayName: 'Active'
        }
      },
      {
        isSelected: true,
        model: {
          displayName: 'Deactived'
        }
      }
    ];
  }
}
