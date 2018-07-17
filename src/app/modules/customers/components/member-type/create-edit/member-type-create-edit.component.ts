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
          message: 'Vui lòng nhập mã loại hội viên'
        },
        {
          type: 'pattern',
          message: 'Mã loại hội viên không được chứa khoảng trắng'
        }
      ],
      memberTypeName: [
        {
          type: 'required',
          message: 'Vui lòng nhập tên loại hội viên'
        }
      ]
    };
    constructor(private readonly memberTypeService: MemberTypeService,
      private readonly translateService: TranslateService,
      private formbuilder: FormBuilder,
      private location: Location) {
      super();
    }

    ngOnInit() {
      this.onCreateForm();
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
      throw new Error('Method not implemented.');
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
        return this.translateService.translateWithParams(key, params);
      }
      return this.translateService.translate(key);
    }
  }
