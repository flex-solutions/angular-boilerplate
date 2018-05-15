import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public notifier: NotificationService) {}

  ngOnInit() {
    this.notifier.showSuccess('HAHA');
    this.notifier.showInfo('HAHA');
    this.notifier.showWarning('HAHA');
    this.notifier.showError('HAHA');
  }
}
