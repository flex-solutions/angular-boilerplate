import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../interfaces/promotion';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IFilterChangedEvent,
  DatagridComponent
} from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { MessageConstant } from '../../messages';
import { TranslateService } from '../../../../shared/services/translate.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { promotionRoute, promotionFields } from '../../common.const';
import { StartStopPromotionService } from '../../services/start-stop-promotion.service';
import {
  CriteriaBuilder,
  FilterType,
  ValueType
} from '../../../../utilities/search-filter';
import { PromotionFilter } from '../promotion-filter/promotion-filter.model';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  public items: Promotion[] = [];
  currentFilterArgs: IFilterChangedEvent;
  promotionFilter: PromotionFilter = new PromotionFilter();
  @ViewChild(DatagridComponent) dataGrid: DatagridComponent;
  constructor(
    private service: PromotionService,
    private route: Router,
    private translateService: TranslateService,
    private dialogManager: ExDialog,
    private notificationService: NotificationService,
    private startStopPromotionHandler: StartStopPromotionService
  ) {
    this.currentFilterArgs = { pagination: null, searchKey: null };
  }

  ngOnInit() {}

  public count = (searchKey: string) => {
    const query = this.buildPromotionFilter();
    return this.service.count(query);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPromotions();
  }

  loadPromotions() {
    const pagination = this.currentFilterArgs.pagination;
    const query = this.buildPromotionFilter();
    this.service
      .getPromotions(pagination.page, pagination.itemsPerPage, query)
      .subscribe((response: Promotion[]) => {
        this.items = response;
      });
  }

  navigateToCreate() {
    this.route.navigate([promotionRoute.CREATE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${promotionRoute.EDIT}/${id}`]);
  }

  navigateToDetail(id: string) {
    this.route.navigate([`${promotionRoute.DETAIL}/${id}`]);
  }

  startStopPromotion(item: Promotion) {
    this.startStopPromotionHandler.startStopPromotion(item, () => {
      this.loadPromotions();
    });
  }

  deletePromotion(model: Promotion) {
    const confirmMsg = this.translateService.translate(
      MessageConstant.DeleteConfirmation,
      model.title
    );
    const confirmTitle = this.translateService.translate(
      MessageConstant.DeleteTitle
    );
    this.dialogManager
      .openConfirm(confirmMsg, confirmTitle)
      .subscribe(result => {
        if (result) {
          const successMessage = this.translateService.translate(
            MessageConstant.DeleteSuccessfullyNotification
          );
          this.service.deletePromotion(model._id).subscribe(res => {
            this.notificationService.showSuccess(successMessage);
            this.loadPromotions();
          });
        }
      });
  }

  private buildPromotionFilter() {
    const builder = CriteriaBuilder.makeCriteria().startWrapperFilter(
      FilterType.And
    );

    builder
      .withFilter(
        FilterType.GreatThanEqual,
        promotionFields.START_DATE,
        this.promotionFilter.startDate,
        ValueType.Date
      )
      .withFilter(
        FilterType.LessThanEqual,
        promotionFields.EXPIRE_DATE,
        this.promotionFilter.endDate,
        ValueType.Date
      )
      .withFilter(
        FilterType.In,
        promotionFields.STATUS,
        this.promotionFilter.status,
        ValueType.Array
      )
      .withCriteria(() => {
        return CriteriaBuilder.makeCriteria()
          .startWrapperFilter(FilterType.Or)
          .withFilter(
            FilterType.Regex,
            promotionFields.TITLE,
            this.promotionFilter.title
          )
          .withFilter(
            FilterType.Regex,
            promotionFields.CONTENT,
            this.promotionFilter.content
          )
          .endWrapperFilter()
          .build();
      });

    const result = builder.endWrapperFilter().build();
    return result;
  }

  onRunFilterClicked() {
    this.loadDataWithFilter();
  }

  resetFilter = () => {
    this.loadDataWithFilter();
  }

  private loadDataWithFilter() {
    this.count('').subscribe(total => {
      this.dataGrid.totalItems = +total;
      this.dataGrid.countPageEntry();
      this.loadPromotions();
    });
  }
}
