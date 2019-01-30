import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  user = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get('/api/services/app/HostSettings/GetAllSettings');
  }

  // @params identifier:string,password:password
  // return jwf & user
  set(body): Observable<any> {
    return this.http.put('/api/services/app/HostSettings/UpdateAllSettings', body);
  }

  updateUser(user) {
    this.user.next(user);
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  _getUser(): Observable<any> {
    return this.http.get('/api/services/app/Session/GetCurrentLoginInformations');
  }

  getUploadToken(): Observable<any> {
    return this.http.get('/api/services/app/Picture/GetPictureUploadToken');
  }
}
