import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(q: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}login`, q);
  }

  signup(q: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}signup`, q);
  }


}
