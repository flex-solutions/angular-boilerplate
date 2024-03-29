import { ModelBase } from './model-base';

enum MenuItemStatus {
    ACTIVE,
    DEACTIVE,
    OUT_OF_STOCK,
    ONLY_ONLINE,
    ONLY_OFFLINE
}

class MenuItemDto extends ModelBase {
    iposId: number;
    name: string;
    taPrice: number;
    otsPrice: number;
    sort: number;
    pos: any;
    itemId: string;
    description: string;
    itemType: any;
    status: MenuItemStatus;
    canExchangePoint: true;
    image: any;
    toppings: IMenuTopping[];
    groupName: string;
    size: string;
}

class MenuItemTypeDto extends ModelBase {
    iposId: number;
    name: string;
    active: boolean;
    sort: boolean;
    pos: any;
    textId: string;
}

export default interface IMenuTopping {
    iposId: string;
    name: string;
    minPermitted: number;
    maxPermitted: number;
    options: {
        iposId: string;
        name: string;
        taPrice: number;
        otsPrice: number;
    }[];
}

export { MenuItemDto, MenuItemTypeDto, MenuItemStatus };
