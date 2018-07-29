import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFilterComponent } from './promotion-filter.component';

describe('PromotionFilterComponent', () => {
  let component: PromotionFilterComponent;
  let fixture: ComponentFixture<PromotionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
