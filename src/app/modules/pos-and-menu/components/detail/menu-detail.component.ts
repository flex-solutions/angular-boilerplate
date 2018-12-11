import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { POSService } from '../../services/pos';
import { POSDto } from '../../../../shared/models/pos.model';
import { MenuItemDto } from '../../../../shared/models/menu.model';
import { TranslateService } from '../../../../shared/services/translate.service';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { MessageConst } from '../../constants/menu-item-message.const';
import { getBase64 } from '../../../../utilities/convert-image-to-base64';

@Component({
  moduleId: module.id,
  selector: 'app-pos',
  templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent extends AbstractBaseComponent
  implements OnInit {
  filterEventArgs: IFilterChangedEvent;
  isShowAll: boolean;
  posId: string;
  posName: string;
  subTitle: string;
  pos_menu: MenuItemDto[] = [];

  constructor(
    private readonly posService: POSService,
    activatedRoute: ActivatedRoute,
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {
    super();
    this.posId = activatedRoute.snapshot.params['id'];
    this.isShowAll = isNullOrEmptyOrUndefined(this.posId);
    this.setDetail();
  }

  ngOnInit() {}

  private setDetail() {
    if (!this.isShowAll) {
      this.posService.findById(this.posId).subscribe(res => {
        this.subTitle = this.translateService.translate(
          MessageConst.sub_title_for_pos,
          res.name
        );
      });
    } else {
      this.subTitle = this.translateService.translate(
        MessageConst.general_sub_title
      );
    }
  }

  private getPosesMenu() {
    this.posService
      .findMenuItems(
        this.posId,
        this.filterEventArgs.pagination.itemsPerPage,
        this.filterEventArgs.pagination.page,
        this.filterEventArgs.searchKey
      )
      .subscribe(res => {
        this.pos_menu = res;
      });
  }

  public count = (searchKey: string): Observable<number> => {
    return this.posService.countMenuItem(searchKey, this.posId);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.filterEventArgs = eventArg;
    this.getPosesMenu();
  }

  edit(menuItem: MenuItemDto) {
    this.router.navigate([`pos/menu-items/update/${menuItem._id}`]);
  }
}
