import { OnInit, Component } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteNames } from '../constants/user-groups.constant';

@Component({
  moduleId: module.id,
  selector: 'app-user-group-home',
  templateUrl: './user-group-home.component.html',
})
export class UserGroupHomeComponent extends AbstractFormComponent implements OnInit {
  protected onSubmit() {
    throw new Error('Method not implemented.');
  }
  protected onCancel() {
    throw new Error('Method not implemented.');
  }

  /**
   *
   */
  constructor(private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate([RouteNames.CREATE]);
  }
}
