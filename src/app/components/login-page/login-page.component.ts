import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { URLS } from '../../app-config';
import {Router, ActivatedRoute} from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm;
  isSubmitted;
  invalidPassword: boolean;
  isUserInvalid: boolean;
  isInternalServerErr: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.invalidPassword = false;
    this.isUserInvalid = false;
    this.isSubmitted = true;
    this.isInternalServerErr = false;
    if (this.loginForm.valid) {
      const reqUrl = `${URLS.API_BASE_URL}user?email=${this.loginForm.value.email}`;
      this.httpService.get(reqUrl).subscribe(response => {
        console.log(response, 'response from backend while fetching signup data');
        if (response) {
          if (response.data.password === this.loginForm.value.password) {
            this.authService.userAuthentication(true);
            this.router.navigate(['budget'], {relativeTo: this.activatedRoute});
          } else {
            this.invalidPassword = true;
          }
        } else {
          this.isUserInvalid = true;
        }
      },
      error => {
        this.isInternalServerErr = true;
        console.log(error, 'error while fetching signup data from backend');
      });
    } else {
      console.log('login form is not valid');
    }
  }

  showPassword() {
    const passwordElement = <HTMLInputElement>document.getElementById('login_password');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  }

  navigateToSignup() {
    this.authService.userRegistration(true);
    this.router.navigate(['signup'], {relativeTo: this.activatedRoute});
  }

}
