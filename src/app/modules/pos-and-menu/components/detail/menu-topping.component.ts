import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { POSService } from '../../services/pos';
import { ActivatedRoute } from '@angular/router';
import IMenuTopping from '../../../../shared/models/menu.model';
import { NotificationService } from '../../../../shared/services/notification.service';

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
        private readonly notification: NotificationService,
        activatedRoute: ActivatedRoute
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
        this.notification.showSuccess('Update topping option name successfully');
    }

    async toppingNameChanged(topping: IMenuTopping) {
        await this.posService.updateTopping(topping).toPromise();
        this.notification.showSuccess('Update topping name successfully');
    }

    editToppingName(topping: IMenuTopping) {}
}
