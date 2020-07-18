import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated: boolean;
  isUserAllowedToRegister: boolean;

  constructor() { }

  userAuthentication(statusOfAuthentication) {
    this.isUserAuthenticated = statusOfAuthentication;
  }

  userRegistration(statusOfAllowingToRegister) {
    this.isUserAllowedToRegister = statusOfAllowingToRegister;
  }
}
