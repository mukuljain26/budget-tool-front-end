import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiIntegrationService } from '../../services/api-integration/api-integration.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm;
  dob;
  isSubmitted;

  constructor(private formBuilder: FormBuilder, private apiIntegrationService: ApiIntegrationService) { }

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
    if (this.signupForm.valid) {
      this.signupForm.value['dob'] = this.dob;
      console.log(this.signupForm.value, 'the signup form value');
      const data = {
        email: this.signupForm.value.email,
        data: this.signupForm.value
      };
      this.apiIntegrationService.submitSignupData(data);
    }
  }

}
