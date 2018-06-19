import { DateRangeModel, SingleDateModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { PromotionService } from './../../services/promotion.service';
import { Promotion } from './../../interfaces/promotion';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { PromotionRouting } from '../../messages';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  public items: Promotion[] = [];
  currentFilterArgs: IFilterChangedEvent;
  dateRange: DateRangeModel;
  startDate: SingleDateModel;
  endDate:  SingleDateModel;

  constructor(private service: PromotionService, private route: Router) {
    this.dateRange = new DateRangeModel();
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
}
