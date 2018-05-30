import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { ControllerModel } from '../../../shared/models/controller.model';
import { PermissionSchemeServcie } from '../services/permission-scheme.service';


@Component({
  selector: 'app-create-permission-scheme',
  templateUrl: './create-permission-scheme.component.html',
  styleUrls: ['./create-permission-scheme.component.css']
})
export class CreatePermissionSchemeComponent extends AbstractFormComponent implements OnInit {

  errorMessage: { [key: string]: string } = {};

  public items: ControllerModel[] = [];

  protected onSubmit() {
    throw new Error('Method not implemented.');
  }

  protected onCancel() {
    throw new Error('Method not implemented.');
  }

  constructor(private service: PermissionSchemeServcie) {
    super();
    service.getAllController().subscribe(controllers => this.items = controllers);
   }

  ngOnInit() {
  }

}
