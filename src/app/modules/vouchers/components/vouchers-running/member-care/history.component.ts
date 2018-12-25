import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running-member-care-history',
  templateUrl: './history.component.html',
})

export class HistoryOfMemberCareComponent extends DialogComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
