import { NgFor, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  /*
   * constructor injection is the typically used method for dependancy injection
   * constructor(private http : HttpClient){}
  */
  
  //below is function based injection.
  http = inject(HttpClient);

  title = 'DatingAppClient';
  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => {
        this.users = response;
        console.log(this.users);
      },
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    });
  }

}
