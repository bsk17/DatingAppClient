import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  //currentUser is a signal object 
  if (accountService.currentUser()) {
    return true;
  }
  else {
    toastr.error('You are not authorised to pass!')
    return false;
  }

};
