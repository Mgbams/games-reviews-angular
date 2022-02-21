import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(private http: HttpClient) { }

  public getSingleGame(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/api/games/" + id)
      .pipe(
      catchError( error => of(`Bad Primise: ${error}`)
        )
    );
  }

}
