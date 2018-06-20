import { CheckedItem } from './../../../shared/ui-common/drop-down-check-boxes/checked-items.model';
import { PromotionStatus } from './../directives/promotion-status.directive';
import { ModelBase } from '../../../shared/models/model-base';
export class Promotion extends ModelBase {
    _id: any;
    title: string;
    content: string;
    banner: any;
    status: PromotionStatus;
    start_date: Date;
    expire_date: Date;
    viewCount: number;
}

export class StatusCheckedItem implements CheckedItem {
    displayName: string;
    status: PromotionStatus;
}
