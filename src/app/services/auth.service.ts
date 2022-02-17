import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(form: any) {

    let value = {
      pseudonym : form.pseudonym,
      password : form.password
    };

    return this.http.post('http://localhost:8080/api/player/login', value)
    .subscribe(result => {
      console.log(result);
    });
  }

}
