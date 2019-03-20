import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { MenuItemDto } from '../../../../shared/models/menu.model';
import { POSService } from '../../services/pos';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '../../../../shared/services/translate.service';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import IMenuTopping from '../../../../shared/models/menu.model';

@Component({
    moduleId: module.id,
    selector: 'app-menu-topping',
    templateUrl: './menu-topping.component.html',
    styleUrls: ['./menu-topping.component.css']
})
export class MenuToppingComponent extends AbstractBaseComponent implements OnInit {
    toppings: IMenuTopping[] = [];
    menuItemId: string;

    constructor(
        private readonly posService: POSService,
        activatedRoute: ActivatedRoute,
        private readonly translateService: TranslateService,
        private readonly router: Router
    ) {
        super();
        this.menuItemId = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.getToppings();
    }

    async getToppings() {
        this.toppings = await this.posService.getToppings(this.menuItemId).toPromise();
    }

    async toppingOptionNameChanged(option) {
        await this.posService.updateToppingOption(option).toPromise();
    }

    async toppingNameChanged(topping: IMenuTopping) {
        await this.posService.updateTopping(topping).toPromise();
    }

    editToppingName(topping: IMenuTopping) {}
}
