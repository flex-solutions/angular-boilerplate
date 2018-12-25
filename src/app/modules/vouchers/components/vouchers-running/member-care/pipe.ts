import { Pipe, PipeTransform } from '@angular/core';
import { VoucherTracking } from '../../../../../shared/models/voucher-campaign.model';

@Pipe({
  name: 'voucherTrackingFilter'
})
export class VoucherTrackingsFilter implements PipeTransform {
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
          || it.publish_code.toLowerCase().includes(searchText);
      });
  }
}
