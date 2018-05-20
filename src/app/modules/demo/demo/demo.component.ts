import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  constructor(
    private notifier: NotificationService,
    private demoService: DemoService
  ) {}

  ngOnInit() {
    this.notifier.showSuccess('success');
    this.demoService.findAll().subscribe(t => console.log(t));
    this.demoService.create().subscribe(t => console.log(t));
  }
}
