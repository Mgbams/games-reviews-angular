import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {

  }

  canActivate() : boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/home");
      return false;
    } else {
        return true;
    }
  }
  
}
