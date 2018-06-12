import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../../../shared/models/news.model';
import { NewsService } from '../../services/news.service';
import * as moment from 'moment';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsModel: News = new News();

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
   }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.newsService.getById(id).subscribe(news => {
        if (news) { this.newsModel = news; }
      });
    }
  }

  fromNow() {
  }

}
