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

@Component({
    moduleId: module.id,
    selector: 'app-pos-edit',
    templateUrl: './component.html',
})
export class POSEditComponent extends AbstractFormComponent implements OnInit, AfterViewInit {

    pos: POSDto = new POSDto();
    posId: string;
    selectedDistrict: District;
    selectedCity: Province;

    public errors = {
      name: [{
          type: 'required',
          message: 'pos-menu-name-validate-required'
        },
        {
          type: 'pattern',
          message: 'pos-menu-name-validate-pattern'
        }
      ],
      address: [{
        type: 'required',
        message: 'pos-menu-address-validate-required'
      }],
      phoneNumber: [{
        type: 'required',
        message: 'pos-menu-phone-number-validate-required'
      }],
      coordinates: [{
        type: 'required',
        message: 'pos-menu-coordinates-validate-required'
      }]
    };

    constructor(private readonly location: Location,
      activatedRoute: ActivatedRoute,
      private readonly posService: POSService,
      private readonly formBuilder: FormBuilder,
      public readonly translateService: TranslateService,
      private readonly notification: NotificationService) {
      super();
      this.posId = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
      super.ngOnInit();
      this.getPos();
    }

    get name() {
      return this.formGroup.get('name');
    }

    get address() {
      return this.formGroup.get('address');
    }

    get phoneNumber() {
      return this.formGroup.get('phoneNumber');
    }

    get longitude() {
      return this.formGroup.get('longitude');
    }

    get latitude() {
      return this.formGroup.get('latitude');
    }

    private getPos() {
      this.posService.findById(this.posId).subscribe(res => {
        this.pos = res;
        if (isEmpty(this.pos)) {
          return;
        }

        if (isEmpty(this.pos.openTimes)) {
          const openTime = new POSOpenTimeDto();
          this.pos.openTimes = [openTime];
        } else {
          forEach(this.pos.openTimes, openTime => {
            openTime.internalId = Guid.create().toString();
          });
        }

        this.selectedCity = this.pos.province;
        this.selectedDistrict = this.pos.district;
      });
    }

    protected onSubmit() {
      if (isEmpty(this.pos.openTimes)) {
        this.notification.showError(this.translateService.translate('pos-menu-open-time-validate-required'));
        return;
      }

      this.pos.province = this.selectedCity;
      this.pos.district = this.selectedDistrict;
      this.posService.update(this.pos).subscribe(() => {
        const successMsg = this.translateService.translate('pos-menu-update-pos-success', this.pos.name);
        this.notification.showSuccess(successMsg);
      });
    }

    protected onCancel() {
      this.location.back();
    }

    protected onCreateForm() {
      super.onCreateForm();
      this.formGroup = this.formBuilder.group({
        name: [
          '', [Validators.required, Validators.pattern(validationRegex.notAllowSpecialCharacters)]
        ],
        address: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        longitude: ['', [Validators.required]],
        latitude: ['', [Validators.required]],
      });
    }

    addNewOpenTime(openTime: POSOpenTimeDto) {
      const index = findIndex(this.pos.openTimes, {
        internalId: openTime.internalId
      });
      this.pos.openTimes.splice(index + 1, 0, new POSOpenTimeDto());
    }

    deleteOpenTime(openTime: POSOpenTimeDto) {
      if (this.pos.openTimes.length === 1) {
        return;
      }

      remove(this.pos.openTimes, {
        internalId: openTime.internalId
      });
    }
}
