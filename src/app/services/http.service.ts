import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private apiPrefex: string = '/admin/api/v1';

  constructor(private http: HttpClient) { }

  // // Authentication
  // login(body: LoginDTO) {
  //   return lastValueFrom(this.http.post(`${this.apiPrefex}/auth/signIn`, body));
  // }

  // End of SitemapManagement
}
