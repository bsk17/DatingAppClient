import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

//this interceptor deals in position when any request is going out from angular to API side 
//[all functions are defined before return next(req)]
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  //check if currentUser has been set which happens after login
  if (accountService.currentUser()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.currentUser()?.token}`
      }
    })
  }

  //whatever request is passed it will have the authorization header attached now
  return next(req);
};
