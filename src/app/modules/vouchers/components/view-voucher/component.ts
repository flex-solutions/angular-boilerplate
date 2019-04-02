import { VoucherCreationData } from './../../data';
import { ActivatedRoute, Params } from '@angular/router';
import { VoucherService } from './../../services/vouchers.service';
import { Voucher } from './../../../../shared/models/voucher.model';
import { OnInit, Component } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { PromotionsService } from '../../services/promotions.service';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'app-view-voucher',
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})

export class ViewVoucherComponent extends AbstractBaseComponent implements OnInit {

    voucher: Voucher = new Voucher();
    voucherCode: string;
    isRunning: string;

    constructor(private readonly voucherService: VoucherService,
        private readonly promotionsService: PromotionsService,
        activatedRoute: ActivatedRoute) {
            super();
            activatedRoute.params.subscribe((params: Params) => {
                this.voucherCode = params['id'];
                this.isRunning = params['isRunning'];
            });
        }

    getVoucherRunning = (voucherCode): Observable<Voucher> => {
        return this.promotionsService.getVoucher(voucherCode);
    }

    getStaticVoucher = (voucherId): Observable<Voucher> => {
        return this.voucherService.getById(voucherId);
    }

    ngOnInit() {
        this.getVoucher();
    }

    private getVoucher() {
        const func = this.isRunning === 'true' ? this.getVoucherRunning : this.getStaticVoucher;

        func(this.voucherCode).subscribe(res => {
          this.voucher = res;

          this.voucher.applyDays = VoucherCreationData.applyDays.filter(d => this.voucher.applyDays.find(day => d.id === day));
          this.voucher.applyHourRanges = VoucherCreationData.applyHours.filter(h => this.voucher.applyHourRanges.find(hr => h.id === hr));
        });
    }
}
