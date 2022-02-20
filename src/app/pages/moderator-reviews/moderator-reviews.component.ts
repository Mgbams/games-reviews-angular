import {Component, OnInit, ViewChild} from '@angular/core';
import {ReviewsComponent, Status} from "../../components/reviews/reviews.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-moderator-reviews',
  templateUrl: './moderator-reviews.component.html',
  styleUrls: ['./moderator-reviews.component.css']
})
export class ModeratorReviewsComponent implements OnInit {

  pending = Status.PENDING;
  validated = Status.VALIDATED;

  @ViewChild(ReviewsComponent) reviews!: ReviewsComponent;

  constructor() { }

  ngOnInit(): void { }

  refreshPage($event: MatTabChangeEvent) {
    if ($event.index === 0) {
      this.reviews.getReviews(this.pending);
    } else {
      this.reviews.getReviews(this.validated);
    }
  }
}
