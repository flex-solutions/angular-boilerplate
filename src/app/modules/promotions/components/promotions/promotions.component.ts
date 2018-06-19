import { isNil } from 'ramda';
import { SelectableModel } from './../../../../shared/models/selectable.model';
import { SingleDateModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { PromotionService } from './../../services/promotion.service';
import { Promotion, StatusCheckedItem } from './../../interfaces/promotion';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { PromotionRouting } from '../../messages';
import { PromotionStatus } from '../../directives/promotion-status.directive';

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
  statusItems: SelectableModel<StatusCheckedItem>[];

  constructor(private service: PromotionService, private route: Router) {
    this.startDate = new SingleDateModel();
    this.endDate = new SingleDateModel();
    this.buildStatusItemSource();
  }

  ngOnInit() {
  }

  public count = (searchKey: string) => {
    const selectedStatus = this.getSelectedStatus();
    return this.service.count(searchKey, selectedStatus,
      this.startDate.date,
      this.endDate.date);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPromotions();
  }

  loadPromotions() {
    const pagination = this.currentFilterArgs.pagination;
    const selectedStatus = this.getSelectedStatus();
    this.service
      .getPromotions(
        pagination.itemsPerPage,
        pagination.page,
        this.currentFilterArgs.searchKey,
        selectedStatus,
        this.startDate.date,
        this.endDate.date
      )
      .subscribe((response: Promotion[]) => {
        this.items = response;
      });
  }

  onStartDateChanged($event) {
    this.startDate = $event;
  }

  onEndDateChanged($event) {
    this.endDate = $event;
  }

  navigateToCreate() {
    this.route.navigate([PromotionRouting.CREATE_PAGE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${PromotionRouting.EDIT_PAGE}/${id}`]);
  }

  startStopPromotion(id) {

  }

  getSelectedStatus() {
    const selectedStatus = this.statusItems.filter(i => i.isSelected).map(m => m.model.status);
    return selectedStatus;
  }

  buildStatusItemSource() {
    this.statusItems = [
      {
        isSelected: true,
        model: {
          status: PromotionStatus.New,
          displayName: 'New'
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Active,
          displayName: 'Active'
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Deactived,
          displayName: 'Deactived'
        }
      }
    ];
  }
}
