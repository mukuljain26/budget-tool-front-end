import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  actionType: string;

  get showLogin() {
    return this.actionType === 'login';
  }
  get showSignup() {
    return this.actionType === 'signup';
  }

  proceed(actionType) {
    this.actionType = actionType;
  }
}
