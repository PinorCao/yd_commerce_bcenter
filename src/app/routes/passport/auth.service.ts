import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(body): Observable<any> {
    return this.http.post('/api/services/app/TenantRegistration/RegisterTenant?_allow_anonymous=true', body);
  }

  // @params identifier:string,password:password
  // return jwf & user
  login(body): Observable<any> {
    let url = '/api/TokenAuth/Authenticate?_allow_anonymous=true';
    if (!body.loginCertificate) {
      url = '/api/TokenAuth/PhoneNumAuthenticate?_allow_anonymous=true';
    }
    return this.http.post(url, body);
  }
}
