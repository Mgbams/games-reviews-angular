import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/game.model';
import { Review } from '../model/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private readonly BASE_URL = environment.url;

  constructor(private httpClient: HttpClient) {}

  public getSingleGame(id: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL.gameBaseUrl}/${id}`);
  }

  /*public postReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${this.BASE_URL.addReview}`, review);
  }*/

  // addReview: 'http://localhost:8080/api/reviews/add',
  public postReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${this.BASE_URL.addReview}`, review);
  }


}
