import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const body = $('body');
    $('[data-toggle="minimize"]').on('click', function() {
      if (
        body.hasClass('sidebar-toggle-display') ||
        body.hasClass('sidebar-absolute')
      ) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });
  }
}
