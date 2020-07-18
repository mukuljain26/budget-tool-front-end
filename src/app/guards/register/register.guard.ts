import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isUserAllowedToRegister) {
        return true;
      } else {
        this.router.navigate([''], {relativeTo: this.activatedRoute});
      }
  }
}
