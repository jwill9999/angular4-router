
import { AuthServiceService } from './auth-service.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authServiceService: AuthServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
              : boolean | Observable<boolean> | Promise<boolean> {
    return this.authServiceService.isAuthenticated()
      .then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/'])
          return false;
        }
      }
      )
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state)
  }

}


//AuthGuardService canActivate when called salls isAuthenticated() this would need to have
//some logic to check on the backend if the are authenticated. If they are it returns a boolean true else
// it redirects. This is attached as a property on a Parent route. Same as the canActivateChild is used on
//child routes
