import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Review} from "../../review";
import {ReviewsService} from "../reviews.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  moderatorId: number = environment.moderatorId;

  @Input() review!: Review;
  @Output() refreshPage: EventEmitter<any>;

  constructor(private service: ReviewsService) {
    this.refreshPage = new EventEmitter<any>();
  }

  ngOnInit(): void { }

  validateReview(): void {
    this.review.moderator = { id: this.moderatorId};
    this.service.validateReview(this.review).subscribe({
      next: () => this.refreshPage.emit(),
      error: err => console.error(err.error.message)
    });
  }

  deleteReview(): void {
    this.service.deleteReview(this.review.id).subscribe({
      next: () => this.refreshPage.emit(),
      error: err => console.error(err.error.message)
    });
  }

}
