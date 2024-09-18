import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  //before a request is hit start the spinner
  busyService.busy();

  //once the response is received then add a delay and stop the spinner
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      busyService.idle();
    })
  );
};
