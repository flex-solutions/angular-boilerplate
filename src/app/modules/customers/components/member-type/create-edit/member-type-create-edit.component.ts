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
    public isCreateAnother: boolean;

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
      private notification: NotificationService) {
      super();
    }

    ngOnInit() {
      this.onCreateForm();
      this.createSuccessMsg = this.translateService.translate('member-type-create-form-success');
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
      this.memberTypeService.create(this.memberType).subscribe(() => {
        this.notification.showSuccess(this.createSuccessMsg);
      });
    }
    protected onCancel() {
      this.location.back();
    }

    protected onCreateForm() {
      this.formGroup = this.formbuilder.group({
        memberTypeCode: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        memberTypeName: ['', [Validators.required]],
        memberTypePoint: ['']
      });
    }

    protected getMessage(key: string, ...params) {
      if (params.length) {
        return this.translateService.translate(key, params);
      }
      return this.translateService.translate(key);
    }
  }
