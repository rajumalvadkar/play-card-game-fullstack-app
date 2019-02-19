
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {

  constructor(public commonService: CommonService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.commonService.isLogged()) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }


}
