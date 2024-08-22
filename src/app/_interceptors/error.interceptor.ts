import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

//The interceptors can be used in app.config
//provideHttpClient(withInterceptors([errorInterceptor]))
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            //in case of Validation based 400 error
            if (error.error.errors) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) [
                  modalStateErrors.push(error.error.errors[key])
                ]
              }
              throw modalStateErrors.flat();
            }
            //normal 400 error
            else {
              toastr.error(error.error, error.status);
            }
            break;
          case 401:
            toastr.error('Unauthorised', error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
