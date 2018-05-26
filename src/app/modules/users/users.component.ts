import { Component, OnInit, PipeTransform, Pipe, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userConfiguration } from '../user.configuration';
import { ModalSize } from '../../shared/ui-common/modal/components/dialog.component';
import { ExDialog } from '../../shared/ui-common/modal/services/ex-dialog.service';
import { GroupUserModalComponent } from './component/group-user-modal';
import { Observable, of } from 'rxjs';
import { IFilterChangedEvent } from '../../shared/ui-common/datagrid/components/datagrid.component';

@Pipe({
  name: 'demoFilter'
})
export class FilterPipe1 implements PipeTransform {
  transform(items: DataTable[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.customer.toLowerCase().includes(searchText)
        || it.shipTo.toLowerCase().includes(searchText);
    });
  }
}

export class DataTable {
  orderNumber: number;
  purchasedOn: Date;
  customer: string;
  shipTo: string;
  basePrice: number;
  purchasedPrice: number;
  status: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  public items: DataTable[] = [];
  public imagePath = 'https://placehold.it/100x100';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exDialog: ExDialog) { }

  ngOnInit(): void {
    const item1 = new DataTable();
    item1.orderNumber = 1;
    item1.basePrice = 5000000;
    item1.customer = 'Think Digital';
    item1.purchasedOn = new Date();
    item1.purchasedPrice = 500000000;
    item1.shipTo = 'Quan 1';
    item1.status = true;

    const item2 = new DataTable();
    item2.orderNumber = 2;
    item2.basePrice = 6000000;
    item2.customer = 'SNOB';
    item2.purchasedOn = new Date();
    item2.purchasedPrice = 600000000;
    item2.shipTo = 'Quan go vap';
    item2.status = false;

    this.items = [item1, item2];

  }

  public count = (searchKey: string): Observable<number> => {
    console.log('only should get count when init datagrid of filter changed');
    // call count method in data service class
    return of(300);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    console.log(eventArg);
  }

  getUserInfomation() { }

  showConfirm() {
    this.exDialog.openConfirm('User "hieutran" will be permanently deleted. Are you sure want to delete?',
      'Confirm', ModalSize.Normal)
      .subscribe(result => {
        if (result) {
          alert('Submited');
        }
      });
  }

  navigateToChangeUserGroup() {
    // this.router.navigate([userConfiguration.editUserPageUrl]);
    alert('Redirect to user group page.');
  }

  navigateToCreatePage() {
    this.router.navigate([userConfiguration.createPageUrl], { relativeTo: this.route });
  }

  navigateToEditPage() {
    this.router.navigate([userConfiguration.editUserPageUrl]);
  }

  navigateToUserDetailPage() {
    this.router.navigate([userConfiguration.userDetailPage], { relativeTo: this.route });
  }
}
