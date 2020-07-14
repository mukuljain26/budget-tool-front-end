import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { URLS } from '../../app-config';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  constructor(private httpService: HttpService) { }

  // submit signup data to the backend
  submitSignupData(data) {
    const reqUrl = `${URLS.API_BASE_URL}user`;
    this.httpService.post(reqUrl, data).subscribe(response => {
      console.log(response, 'response from backend while submitting signup data');
    });
  }

  getLoginData() {
    const reqUrl = `${URLS.API_BASE_URL}user`;
    return this.httpService.get(reqUrl);
  }
}
