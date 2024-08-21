import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //injecting account service
  private accountService = inject(AccountService);
  //injecting toastr service
  private toastr = inject(ToastrService);
  model: any = {};

  //Starting from Angular 17.3
  //Step-2 Parent -> Child
  //define an input parameter using signal object way to get data from Home(PARENT) to Regsiter(CHILD)
  //usersFromHomeComponent = input.required<any>();

  //Step-1 Child -> Parent
  //define an output parameter using signal object way to send data from Register(CHILD) to Home(PARENT)
  cancelRegister = output<boolean>();

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    })
  }

  //function to call on click on cancel button
  cancel() {
    //Step-2 Child -> Parent
    //emit the value from the output parameter defined in step 1
    this.cancelRegister.emit(false);
  }
}
