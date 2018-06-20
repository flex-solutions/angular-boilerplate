import { isNil } from 'ramda';
import { SelectableModel } from './../../../../shared/models/selectable.model';
import { SingleDateModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { PromotionService } from './../../services/promotion.service';
import { Promotion, StatusCheckedItem } from './../../interfaces/promotion';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { PromotionRouting, MessageConstant } from '../../messages';
import { PromotionStatus } from '../../directives/promotion-status.directive';
import { TranslateService } from '../../../../shared/services/translate.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';

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
  selectedStatus: StatusCheckedItem[];

  constructor(private service: PromotionService,
    private route: Router,
    private translateService: TranslateService,
    private dialogManager: ExDialog,
    private notificationService: NotificationService) {
    this.startDate = new SingleDateModel();
    this.endDate = new SingleDateModel();
    this.selectedStatus = [];
    this.buildStatusItemSource();
  }

  ngOnInit() {
  }

  public count = (searchKey: string) => {
    const status = this.getSelectedStatus();
    return this.service.count(searchKey, status,
      this.startDate.date,
      this.endDate.date);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPromotions();
  }

  loadPromotions() {
    const pagination = this.currentFilterArgs.pagination;
    const status = this.getSelectedStatus();
    this.service
      .getPromotions(
        pagination.itemsPerPage,
        pagination.page,
        this.currentFilterArgs.searchKey,
        status,
        this.startDate.date,
        this.endDate.date
      )
      .subscribe((response: Promotion[]) => {
        this.items = response;
      });
  }

  navigateToCreate() {
    this.route.navigate([PromotionRouting.CREATE_PAGE]);
  }

  navigateToEdit(id: string) {
    this.route.navigate([`${PromotionRouting.EDIT_PAGE}/${id}`]);
  }

  navigateToDetail(id: string) {
    this.route.navigate([`${PromotionRouting.DETAIL_PAGE}/${id}`]);
  }

  startStopPromotion(id) {

  }

  getSelectedStatus() {
    const selectedStatus = this.selectedStatus.map(m => m.status);
    return selectedStatus;
  }

  deletePromotion(model: Promotion) {
    const confirmMsg = this.translateService.translateWithParams(MessageConstant.DeleteConfirmation, model.title);
    const confirmTitle = this.translateService.translateWithParams(MessageConstant.DeleteTitle);
    this.dialogManager.openConfirm(confirmMsg, confirmTitle).subscribe(result => {
      if (result) {
        const successMessage = this.translateService.translate(MessageConstant.DeleteSuccessfullyNotification);
        this.service.deletePromotion(model._id).subscribe(res => {
          this.notificationService.showSuccess(successMessage);
          this.loadPromotions();
        });
      }
    });
  }

  buildStatusItemSource() {
    this.statusItems = [
      {
        isSelected: true,
        model: {
          status: PromotionStatus.New,
          displayName: this.translateService.translate(MessageConstant.NewStatus)
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Active,
          displayName: this.translateService.translate(MessageConstant.ActiveStatus)
        }
      },
      {
        isSelected: true,
        model: {
          status: PromotionStatus.Deactivated,
          displayName: this.translateService.translate(MessageConstant.DeactivedStatus)
        }
      }
    ];
  }
}