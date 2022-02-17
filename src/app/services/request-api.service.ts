import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(private http: HttpClient) { }

  public getSingleGame(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/api/games/" + id);
  }
}
