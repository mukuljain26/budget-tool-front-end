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
      password: ['', Validators.required],
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
      this.signupForm.value['dob'] = this.dob;
      console.log(this.signupForm.value, 'the signup form value');
      const data = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        data: this.signupForm.value
      };
      const reqUrl = `${URLS.API_BASE_URL}user`;
      this.httpService.post(reqUrl, data).subscribe(response => {
        console.log(response, 'response from backend while submitting signup data');
        this.isSuccessInSignup = true;
      },
      error => {
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

}
