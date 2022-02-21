import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public logValue : any;
  private readonly BASE_URL = environment.url;

  constructor(private http: HttpClient) { }

  public authenticate(form: any) {

    let value = {
      pseudonym : form.pseudonym,
      password : form.password
    };

    return this.http.post('http://localhost:8080/api/player/login', value)
    .subscribe(result => {
      sessionStorage.setItem('currentUser', JSON.stringify(result));
      //window.location.reload();
      console.log(result);

    });
  }

  isAuthenticated(): any{
    if (sessionStorage.getItem('currentUser')) {
      this.logValue =sessionStorage.getItem('currentUser');
      return JSON.parse(this.logValue);
    } else {
      return null;
    }
  }

  public Logout() {
    sessionStorage.removeItem('currentUser');
    window.location.reload();
  }

  public getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL.playerPlayerById}/${id}`);
  }
}
