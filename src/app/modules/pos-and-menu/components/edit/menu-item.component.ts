import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { Guid } from 'guid-typescript';
import { POSService } from './../../services/pos';
import { OnInit } from '@angular/core/src/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { POSDto, POSOpenTimeDto } from '../../../../shared/models/pos.model';
import { isEmpty, findIndex, remove, forEach, omit } from 'lodash';
import { District, Province } from '../../../../shared/models/address.model';
import { FormBuilder, Validators } from '@angular/forms';
import { validationRegex } from '../../../../shared/validation/validators';
import { MenuItemDto } from '../../../../shared/models/menu.model';

@Component({
  moduleId: module.id,
  selector: 'app-menu-item-edit',
  templateUrl: './menu-item.component.html'
})
export class EditMenuItemComponent extends AbstractFormComponent
  implements OnInit, AfterViewInit {
  menuItem: MenuItemDto = new MenuItemDto();
  itemId: string;
  isApplyAll: boolean;

  public errors = {
    // will be define when required changed or system extend.
    description: []
  };

  constructor(
    private readonly location: Location,
    activatedRoute: ActivatedRoute,
    private readonly posService: POSService,
    private readonly formBuilder: FormBuilder,
    public readonly translateService: TranslateService,
    private readonly notification: NotificationService
  ) {
    super();
    this.itemId = activatedRoute.snapshot.params['id'];
    this.isApplyAll = false;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getMenuItem();
  }

  get description() {
    return this.formGroup.get('description');
  }

  get canExchangePoint() {
    return this.formGroup.get('canExchangePoint');
  }

  get isApplyForAllItem() {
    return this.formGroup.get('isApplyForAllItem');
  }

  private getMenuItem() {
    this.posService.findMenuItemById(this.itemId).subscribe(res => {
      this.menuItem = res;
      if (isEmpty(this.menuItem)) {
        return;
      }
    });
  }

  protected onSubmit() {
    console.log(this.isApplyAll);
    this.posService.updateMenuITem(this.menuItem, this.isApplyAll).subscribe(() => {
        const successMsg = this.translateService.translate(
          'pos-menu-update-pos-success',
          this.menuItem.name
        );
        this.notification.showSuccess(successMsg);
      });
  }

  protected onCancel() {
    this.location.back();
  }

  protected onCreateForm() {
    super.onCreateForm();

    this.formGroup = this.formBuilder.group({
      description: ['', []],
      canExchangePoint: ['', []],
      isApplyForAllItem:   ['', []],
    });
  }
}
