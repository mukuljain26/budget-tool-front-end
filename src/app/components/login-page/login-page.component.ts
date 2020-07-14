import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { URLS } from '../../app-config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    const reqUrl = `${URLS.API_BASE_URL}user?email=${this.loginForm.value.email}`;
    return this.httpService.get(reqUrl).subscribe(response => {
      console.log(response, 'response from backend while fetching signup data');
      if (response.data.password === this.loginForm.value.password) {
        this.router.navigateByUrl('budget');
      }
    },
    error => {
      console.log(error, 'error while fetching signup data from backend');
    });
  }

}
