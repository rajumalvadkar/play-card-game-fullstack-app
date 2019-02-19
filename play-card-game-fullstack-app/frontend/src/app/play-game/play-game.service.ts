import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayGameService {
  constructor(private http: HttpClient) {
  }

  getUser(_id: String): Observable<any> {
    return this.http.get(`${environment.apiUrl}user/${_id}`);
  }

  updateUser(q: Object): Observable<any> {
    return this.http.put(`${environment.apiUrl}user`, q);
  }

}
