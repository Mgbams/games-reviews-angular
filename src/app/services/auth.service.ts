import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public logValue : any;

  constructor(private http: HttpClient) { }

  public authenticate(form: any) {

    let value = {
      pseudonym : form.pseudonym,
      password : form.password
    };

    return this.http.post('http://localhost:8080/api/player/login', value)
    .subscribe(result => {
      sessionStorage.setItem('currentUser', JSON.stringify(result));
      window.location.reload();

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
}
