import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiIntegrationService } from '../../services/api-integration/api-integration.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm;
  dob;

  constructor(private formBuilder: FormBuilder, private apiIntegrationService: ApiIntegrationService) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      reEnteredPassword: ['']
    });
  }

  getDob(dobEvent) {
    if (dobEvent) {
      this.dob = `${dobEvent.year}-${dobEvent.month}-${dobEvent.day}`;
    }
  }

  submitSignupData() {
    this.signupForm.value['dob'] = this.dob;
    console.log(this.signupForm.value, 'the signup form value');
    const data = {
      email: this.signupForm.value.email,
      data: this.signupForm.value
    };
    this.apiIntegrationService.submitSignupData(data);
  }

}
