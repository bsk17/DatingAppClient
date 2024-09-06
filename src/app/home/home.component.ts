import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  /*
   * constructor injection is the typically used method for dependancy injection
   * constructor(private http : HttpClient){}
  */
  //below is function based injection.
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  //Step-4 Child->Parent
  //define the method which was tagged to the output parameter from Step-3
  cancelRegisterMode(event: boolean) {
    this.registerMode = false;
  }

  //get all users directly without using services as intermediatary layer
  // getUsers() {
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => {
  //       this.users = response;
  //       console.log(this.users);
  //     },
  //     error: error => console.log(error),
  //     complete: () => console.log('getUser Request has completed')
  //   });
  // }
}
