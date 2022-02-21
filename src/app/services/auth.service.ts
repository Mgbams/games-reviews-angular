import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logValue: any;
  private readonly BASE_URL = environment.url;

  constructor(private http: HttpClient, private notification: MatSnackBar) {}

  public authenticate(form: any) {
    let value = {
      pseudonym: form.pseudonym,
      password: form.password,
    };

    return this.http
      .post('http://localhost:8080/api/player/login', value)
      .subscribe({
        next: (result) => {
          sessionStorage.setItem('currentUser', JSON.stringify(result));
          this.successfulLogin();
          window.location.reload();
        }, error: (err) => this.errorDuringLogin()
      });
   }

  isAuthenticated(): any {
    if (sessionStorage.getItem('currentUser')) {
      this.logValue = sessionStorage.getItem('currentUser');
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

  successfulLogin() {
    this.notification.open(`You successfully logged in`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });
  }

  errorDuringLogin() {
    this.notification.open('Error during login', undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }
}
