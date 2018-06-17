import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsRouteNames } from '../../constants/news.constant';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.css']
})
export class NewsHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToNewsDetails(id: string) {
    this.router.navigate([NewsRouteNames.VIEW, id]);
  }
}
