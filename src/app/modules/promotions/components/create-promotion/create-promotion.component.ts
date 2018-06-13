import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {

  title: string;
  subTitle: string;
  formGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.title = 'Create Promotion';
    this.subTitle = 'This page allows you creating a promotion and starts it if you want';
  }
}
