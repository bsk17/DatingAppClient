import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
//responsible for activating and deactivating Spinner when some loading activity is being performed
export class BusyService {

  busyRequestCount = 0;
  private spinnerService = inject(NgxSpinnerService);

  //function to show the spinner
  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(255,255,255,0)',
      color: 'white'
    })
  }

  //function to hide the spinner
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
