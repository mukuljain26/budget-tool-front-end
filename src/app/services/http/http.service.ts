import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public post(url, data, options?): Observable<any> {
    return this.httpClient.post<any>(url, data, options);
  }

  public get(url, options?): Observable<any> {
    return this.httpClient.get<any>(url, options);
  }

  public put(url, data?, options?): Observable<any> {
    return this.httpClient.put<any>(url, data, options);
  }

  public patch(url, data, options?): Observable<any> {
    return this.httpClient.patch<any>(url, data, options);
  }

  public delete(url, options?): Observable<any> {
    return this.httpClient.delete<any>(url, options);
  }
}
