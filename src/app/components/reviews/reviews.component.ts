import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../review";
import {ReviewsService} from "./reviews.service";
import {Page} from "../page";
import {Pageable} from "../pagination/pagination.component";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() status!: Status;
  @Input() pageable: Pageable;

  reviews!: Review[];

  constructor(private service: ReviewsService) {
    this.pageable = new Pageable();
  }

  ngOnInit(): void {
    this.refreshReviews();
  }

  public refreshReviews(): void {
    this.getReviews(this.status);
  }

  public getReviews(status: Status): void {
    this.status = status;
    if (status === Status.PENDING) {
      this.getPendingReviews();
    } else if (status === Status.VALIDATED) {
      this.getValidatedReviews();
    }
  }

  private getPendingReviews(): void {
    this.service.getPendingReviews(this.pageable.number, this.pageable.size, 'publicationDateTime', true)
      .subscribe({
        next : value => this._mapPage(value),
        error : err => console.error(err.error.message)
    });
  }

  private getValidatedReviews(): void {
    this.service.getValidatedReviews(this.pageable.number, this.pageable.size, 'publicationDateTime', true)
      .subscribe({
        next : value => this._mapPage(value),
        error : err => console.error(err.error.message)
    });
  }

  private _mapPage(value: Page): void {
    this.reviews = value.content;
    this.pageable.number = value.number;
    this.pageable.size = value.size;
    this.pageable.totalElements = value.totalElements;
  }

}

export const enum Status {
  PENDING = "Pending reviews",
  VALIDATED = "Validated reviews"
}
