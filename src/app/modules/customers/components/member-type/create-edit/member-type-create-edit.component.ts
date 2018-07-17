import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from './../../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from './../../../../../shared/services/translate.service';
import { MemberType } from './../../../../../shared/models/member-type.model';
import { MemberTypeService } from './../../../services/member-type.service';
import { OnInit, Component } from '@angular/core';
import { AbstractFormComponent } from '../../../../../shared/abstract/abstract-form-component';

@Component({
    selector: 'app-member-type-create-edit',
    templateUrl: './member-type-create-edit.component.html'
  })
  export class MemberTypeCreateEditComponent extends AbstractFormComponent implements OnInit {

    public memberType: MemberType = new MemberType();
    memberTypeId: string;

    public errors = {
      memberTypeCode: [
        {
          type: 'required',
          message: 'member-type-create-form-code-required'
        },
        {
          type: 'pattern',
          message: 'member-type-create-form-code-pattern'
        }
      ],
      memberTypeName: [
        {
          type: 'required',
          message: 'member-type-create-form-name-required'
        }
      ]
    };

    createSuccessMsg: string;

    constructor(private readonly memberTypeService: MemberTypeService,
      public readonly translateService: TranslateService,
      private formbuilder: FormBuilder,
      private location: Location,
      private notification: NotificationService,
      activatedRoute: ActivatedRoute) {
      super();
      activatedRoute.params.subscribe((params: Params) => {
        this.memberTypeId = params['id'] ? params['id'] : '';
        this.isEdit = params['id'] ? true : false;
        // if (this.isEdit) {
        //   this.cardTitle = this.translateService.translate(TITLE_EDIT_CUSTOMER);
        //   this.cardDescription = this.translateService.translate(
        //     DESCRIPTION_EDIT_CUSTOMER
        //   );
        // } else {
        //   this.cardTitle = this.translateService.translate(TITLE_CREATE_CUSTOMER);
        //   this.cardDescription = this.translateService.translate(
        //     DESCRIPTION_CREATE_CUSTOMER
        //   );
        // }
      });
    }

    ngOnInit() {
      super.ngOnInit();
      this.createSuccessMsg = this.isEdit === false ? this.translateService.translate('member-type-create-form-success')
      : this.translateService.translate('member-type-edit-form-success');
      this.getMemberTypeInfoForEdit();
    }

    get memberTypeCode() {
      return this.formGroup.get('memberTypeCode');
    }

    get memberTypeName() {
      return this.formGroup.get('memberTypeName');
    }

    get memberTypePoint() {
      return this.formGroup.get('memberTypePoint');
    }

    protected onSubmit() {
      if (this.isEdit === true) {
        this.memberTypeService.update(this.memberType).subscribe(() => {
          this.notification.showSuccess(this.createSuccessMsg);
          this.onCancel();
        });
      } else {
        this.memberTypeService.create(this.memberType).subscribe(() => {
          this.notification.showSuccess(this.createSuccessMsg);
          this.finish();
        });
      }
    }
    protected onCancel() {
      this.location.back();
    }

    protected onCreateForm() {
      super.onCreateForm();
      this.formGroup = this.formbuilder.group({
        memberTypeCode: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        memberTypeName: ['', [Validators.required]],
        memberTypePoint: ['']
      });
    }

    protected resetForm() {
      super.resetForm();
      this.memberType = new MemberType();
    }

    private getMemberTypeInfoForEdit() {
      if (this.isEdit === true) {
        this.memberTypeService.getMemberType(this.memberTypeId).subscribe(memberType => {
          this.memberType = memberType;
        });
      }
    }
  }
