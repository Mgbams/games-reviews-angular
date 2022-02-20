import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorReviewsComponent } from './moderator-reviews.component';

describe('ModeratorReviewsComponent', () => {
  let component: ModeratorReviewsComponent;
  let fixture: ComponentFixture<ModeratorReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
