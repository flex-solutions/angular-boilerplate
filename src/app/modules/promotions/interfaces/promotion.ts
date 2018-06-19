import { CheckedItem } from './../../../shared/ui-common/drop-down-check-boxes/checked-items.model';
import { PromotionStatus } from './../directives/promotion-status.directive';
export class Promotion {
    _id: any;
    title: string;
    content: string;
    banner: any;
    status: PromotionStatus;
    start_date: Date;
    expire_date: Date;
    view_count: number;
}

export class StatusCheckedItem implements CheckedItem {
    displayName: string;
    status: PromotionStatus;
}
