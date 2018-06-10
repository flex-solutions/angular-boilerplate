import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {
  title: string;
  subTitle: string;
  constructor() { }

  ngOnInit() {
    this.title = 'Create Promotion';
    this.subTitle = 'This page allows you creating a promotion and starts it if you want';
  }

}
