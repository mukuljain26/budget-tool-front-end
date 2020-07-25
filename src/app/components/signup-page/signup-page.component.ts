import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiIntegrationService } from '../../services/api-integration/api-integration.service';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { URLS } from '../../app-config';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm;
  dob;
  isSubmitted;
  isSuccessInSignup: boolean;
  isUserAlreadyExist: boolean;
  isInternalServerErr: boolean;
  showLoader: boolean;
  // passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  passwordRegex = new RegExp('(?=.{8,})');

  constructor(private formBuilder: FormBuilder,
              private apiIntegrationService: ApiIntegrationService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      reEnteredPassword: ['', Validators.required],
    });
  }

  getDob(dobEvent) {
    if (dobEvent) {
      this.dob = `${dobEvent.year}-${dobEvent.month}-${dobEvent.day}`;
    }
  }

  submitSignupData() {
    this.isSubmitted = true;
    this.isUserAlreadyExist = false;
    this.isInternalServerErr = false;
    if (this.signupForm.valid) {
      this.showLoader = true;
      // document.getElementById('budget_tool').classList.add('show-loader');
      this.signupForm.value['dob'] = this.dob;
      console.log(this.signupForm.value, 'the signup form value');
      const data = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        data: this.signupForm.value
      };
      const reqUrl = `/user`;
      this.httpService.post(reqUrl, data).subscribe(response => {
        this.showLoader = false;
        // document.getElementById('budget_tool').classList.remove('show-loader');
        console.log(response, 'response from backend while submitting signup data');
        this.isSuccessInSignup = true;
      },
      error => {
        this.showLoader = false;
        // document.getElementById('budget_tool').classList.remove('show-loader');
        if (error.error.code === 11000) {
          this.isUserAlreadyExist = true;
        } else {
          this.isInternalServerErr = true;
        }
      }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate([''], {relativeTo: this.activatedRoute});
  }

  showPassword(event) {
    document.getElementById(event.target.id).classList.toggle('visibility-icon-enabled');
    const passwordElement = <HTMLInputElement>document.getElementById('password');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  }

  showRePassword(event) {
    document.getElementById(event.target.id).classList.toggle('visibility-icon-enabled');
    const passwordElement = <HTMLInputElement>document.getElementById('re_password');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  }

}
