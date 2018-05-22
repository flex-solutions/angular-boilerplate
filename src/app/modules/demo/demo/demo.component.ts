import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { DemoService } from '../services/demo.service';
import { LoaderService } from '../../../shared/ui-common/loading-bar/loader.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  constructor(
    private notifier: NotificationService,
    private demoService: DemoService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.notifier.showSuccess('success');
    this.demoService.findAll().subscribe(t => console.log(t));
    // this.demoService.create().subscribe(t => console.log(t));
    // this.loaderService.show();
    // this.loaderService.hide();
  }
}
