import { CheckedItem } from './../../../shared/ui-common/drop-down-check-boxes/checked-items.model';
import { PromotionStatus } from './../directives/promotion-status.directive';
import { ModelBase } from '../../../shared/models/model-base';
import { Voucher } from '../../../shared/models/voucher.model';
export class Promotion extends ModelBase {
    _id: any;
    title: string;
    content: string;
    banner: any;
    status: PromotionStatus;
    start_date: Date;
    expire_date: Date;
    viewCount: number;
    brief_content: string;
    voucher: Voucher;
    member_filter: any;
    is_publish_news: boolean;
}

export class StatusCheckedItem implements CheckedItem {
    displayName: string;
    status: PromotionStatus;
}
