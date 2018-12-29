import { VoucherTracking } from '../../../../../shared/models/voucher-campaign.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'voucherTrackingFilter'
})
export class VoucherTrackingFilter implements PipeTransform {
  transform(items: VoucherTracking[], searchText: string): any[] {
      if (!items) {
          return [];
      }
      if (!searchText) {
          return items;
      }
      searchText = searchText.toLowerCase();
      return items.filter(it => {
          return it.membership_id.toLowerCase().includes(searchText)
          || it.publish_code.toLowerCase().includes(searchText)
          || (it.bill_id && it.bill_id.toLowerCase().includes(searchText));
      });
  }
}
