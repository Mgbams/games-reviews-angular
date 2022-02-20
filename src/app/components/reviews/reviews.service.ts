import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Page} from "../page";
import {environment} from "../../../environments/environment";
import {UrlUtils} from "../url-utils";
import {Review} from "../review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private readonly BASE_URL = environment.url;

  constructor(private http: HttpClient) { }

  public getValidatedReviews(page: number, size: number, sort: string, desc: boolean, gameId?: number): Observable<Page> {
    let url = this.BASE_URL.validatedReviewsUrl + '?';
    if (gameId !== undefined) {
      url += `gameId=${gameId}&`;
    }
    url += UrlUtils.buildPageableParams(page, size, sort, desc);
    return this.http.get<Page>(url);
  }

  public getPendingReviews(page: number, size: number, sort: string, desc: boolean): Observable<Page> {
    const url = this.BASE_URL.pendingReviewsUrl + '?' + UrlUtils.buildPageableParams(page, size, sort, desc);
    return this.http.get<Page>(url);
  }

  public validateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(this.BASE_URL.validateReviewUrl, review);
  }

  public deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL.deleteReviewUrl + id);
  }

}
