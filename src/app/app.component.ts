import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  actionType: string;

  constructor(private router: Router) {}

  get showLogin() {
    return this.actionType === 'login';
  }
  get showSignup() {
    return this.actionType === 'signup';
  }

  proceed(actionType) {
    this.actionType = actionType;
    switch (actionType) {
      case 'login':
        this.router.navigateByUrl('/login');
        break;
      case 'signup':
        this.router.navigateByUrl('/signup');
        break;
    }
  }
}
