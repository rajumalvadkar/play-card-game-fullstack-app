import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  objUserDetails: Object;

  constructor() {
  }

  getUser() {
    const userDetails: any = localStorage.getItem('userDetails');
    if (userDetails !== null) {
      this.objUserDetails = userDetails.hasOwnProperty('userDetails') ? JSON.parse(userDetails['userDetails']) : JSON.parse(userDetails);
    }
  }

  setToken(objUserDetails: Object): void {
    console.log('objUserDetails', objUserDetails);
    this.objUserDetails = objUserDetails;
    localStorage.setItem('userDetails', JSON.stringify(objUserDetails));
    if (objUserDetails['token']) {
      localStorage.setItem(TOKEN, objUserDetails['token']);
    }
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem('userDetails');
  }
}
