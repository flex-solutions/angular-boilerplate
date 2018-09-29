import { isEmpty } from 'ramda';
import { MembershipTypeService } from '../../services/membership-type.service';
import { MembershipType } from '../../../../shared/models/membership-type.model';
import { MemberErrors } from '../../constants/member.constants';
import { MemberService } from '../../services/member.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemberModel } from '../../../../shared/models/member.model';
import {
  Province,
  District,
  Country
} from '../../../../shared/models/address.model';
import { AbstractFormCreateMoreComponent } from '../../../../shared/abstract/abstract-form-create-more';
import {
  GenericValidator,
  IValidationMessage
} from '../../../../shared/validation/generic-validator';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { AddressComponent } from '../../../../shared/ui-common/address/address.component';
import { appVariables } from '../../../../app.constant';
import * as _ from 'lodash';

const TITLE_CREATE_MEMBER = 'member-create_edit_member-h4-create_member';
const DESCRIPTION_CREATE_MEMBER =
  'member-create_edit_member-h4-create_member_description';
const TITLE_EDIT_MEMBER = 'member-create_edit_member-h4-edit_member';
const DESCRIPTION_EDIT_MEMBER =
  'member-create_edit_member-h4-edit_member_description';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-member',
  templateUrl: './create-edit-member.component.html',
  styles: [
    `
      :host
        ::ng-deep
        .select2-container--default
        .select2-selection--single
        .select2-selection__placeholder {
        color: #fff;
      }
    `
  ]
})
export class CreateEditMemberComponent extends AbstractFormCreateMoreComponent
  implements OnInit {
  isEdit = false;
  member: MemberModel = new MemberModel();
  fullMembershipTypes: MembershipType[] = [];
  membershipTypes: MembershipType[] = [];
  selectedDistrict: District;
  selectedCity: Province;
  typeId = -1;
  memberId: string;
  cardTitle: string;
  cardDescription: string;
  femaleResource: string;
  maleResource: string;
  otherSexResource: string;
  sexes: any[] = [];
  @ViewChild('memberAddress')
  addressControl: AddressComponent;

  // Define validation message
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    email: {
      pattern: {
        message: MemberErrors.EmailInvalid
      }
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private membershipTypeService: MembershipTypeService,
    translateService: TranslateService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    super(translateService);
    this.member.isMemberAccumulated = true;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.memberId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      if (this.isEdit) {
        this.cardTitle = this.translateService.translate(TITLE_EDIT_MEMBER);
        this.cardDescription = this.translateService.translate(
          DESCRIPTION_EDIT_MEMBER
        );
      } else {
        this.cardTitle = this.translateService.translate(TITLE_CREATE_MEMBER);
        this.cardDescription = this.translateService.translate(
          DESCRIPTION_CREATE_MEMBER
        );
      }
    });

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );

    this.onCreateForm();
    this.loadInformation();
  }

  async loadInformation() {
    this.sexes = this.memberService.getSexes();
    await this.loadMembershipTypes();
    await this.loadMember();
    this.buildMembershipTypes();
  }

  private async loadMembershipTypes() {
    this.fullMembershipTypes = await this.membershipTypeService
      .getMembershipTypes()
      .toPromise();
  }

  async loadMember() {
    if (this.isEdit) {
      const value = (await this.memberService
        .get(this.memberId)
        .toPromise()) as MemberModel;
      if (value) {
        this.member._id = value._id;
        this.member.membershipType = this.fullMembershipTypes.find(
          i => i._id === value.membershipType
        );
        if (!isNullOrEmptyOrUndefined(this.member.membershipType)) {
          this.member.isMemberAccumulated = this.member.membershipType.isAccumulated;
        }
        this.member.sex = this.sexes.find(i => i.id === value.sex);
        if (this.member.address && !isNullOrEmptyOrUndefined(value.address)) {
          this.member.address.copyFrom(value.address);
        }
        if (
          this.member &&
          this.member.address &&
          this.member.address.country &&
          this.member.address.country.provinces.length > 0
        ) {
          if (
            !isNullOrEmptyOrUndefined(
              this.member.address.country.provinces[0].name
            )
          ) {
            // find selected id
            this.selectedCity = this.member.address.country.provinces[0];
            if (
              this.selectedCity &&
              this.selectedCity.districts &&
              this.selectedCity.districts.length > 0
            ) {
              this.selectedDistrict = this.member.address.country.provinces[0].districts[0];
            }
          }
        }
        this.member.memberId = value.memberId;
        this.member.name = value.name;
        this.member.birthday = value.birthday;
        this.member.phoneNumber = value.phoneNumber;
        this.member.email = value.email;
        this.member.point = value.point;
      } else {
        // Navigate to previous if user group not found.
        this.location.back();
      }
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  get sex() {
    return this.formGroup.get('sex');
  }

  get membershipType() {
    return this.formGroup.get('membershipType');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get email() {
    return this.formGroup.get('email');
  }

  protected onCreateForm() {
    this.formGroup = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(appVariables.noSpecialCharactersRegex)
        ]
      ],
      phone: [
        '+84',
        [Validators.required, Validators.pattern('\\+84[0-9]{9,10}')]
      ],
      birthday: ['', []],
      membershipType: ['', []],
      sex: [this.member.sex, []],
      address: ['', []],
      district: [this.selectedCity, []],
      city: [this.selectedCity, []],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      createAnother: ['', []],
      isMemberAccumulated: ['', []]
    });
  }

  protected onSubmit() {
    if (!this.isEdit) {
      const newMember = this.prepareMember();
      this.memberService.create(newMember).subscribe(() => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          MemberErrors.Create_Member_Sucess,
          this.member.name
        );
        this.notificationService.showSuccess(msg);
        this.refreshPageIfCreateAnother();
      });
    }
  }

  protected onValidate() {}

  protected onCancel() {
    this.location.back();
  }

  saveMember() {
    const newMember = this.prepareMember();
    this.memberService.update(newMember).subscribe(() => {
      // * Create news successful, display success notification
      const msg = this.getMessage(
        MemberErrors.Edit_Member_Sucess,
        this.member.name
      );
      this.notificationService.showSuccess(msg);
      this.refreshPageIfCreateAnother();
    });
  }

  private prepareMember(): MemberModel {
    const newMember = new MemberModel();
    newMember.clone(this.member as MemberModel);

    if (
      this.selectedCity != null &&
      !isNullOrEmptyOrUndefined(this.selectedCity.name)
    ) {
      newMember.address.country = new Country();
      newMember.address.country.provinces = [];
      const city = new Province();
      city.copyFrom(this.selectedCity);
      newMember.address.country.provinces.push(city);
      newMember.address.country.provinces[0].districts = [];

      const district = new District();
      district.copyFrom(this.selectedDistrict);
      newMember.address.country.provinces[0].districts.push(district);
    }
    if (!isNullOrEmptyOrUndefined(newMember.sex)) {
      newMember.sex = this.member.sex.id;
    }
    return newMember;
  }

  protected refreshPageIfCreateAnother() {
    if (this.isCreateAnother) {
      this.resetSome();
      this.member = new MemberModel();
    } else {
      this.location.back();
    }
  }

  onIsMemberAccumulatedChanged($event) {
    this.buildMembershipTypes();
  }

  buildMembershipTypes() {
    const tmpMembershipTypes = this.fullMembershipTypes.filter(
      i => i.isAccumulated === this.member.isMemberAccumulated
    );

    this.membershipTypes = _.sortBy(tmpMembershipTypes, [
      function(o: MembershipType) {
        return o.point;
      }
    ]);

    if (!this.isEdit && !isEmpty(this.membershipTypes)) {
      this.member.membershipType = this.membershipTypes[0];
    }
  }

  private resetSome() {
    this.formGroup.reset();
    this.formGroup.get('name').reset();
    this.formGroup.get('phone').reset();
    this.formGroup.get('createAnother').reset();
    this.formGroup.get('address').reset();
    this.formGroup.get('email').reset();
    this.addressControl.reset();
  }
}
