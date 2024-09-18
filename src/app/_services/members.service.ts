import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //function based injection
  private http = inject(HttpClient);

  //we have created environment variables for production and development.
  baseUrl = environment.apiUrl;

  //a signal variable to store the members throughout the application
  members = signal<Member[]>([]);

  //api call to get all the members
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      //setting the signal members helps in reducing the api calls to this one
      next: members => this.members.set(members)
    });
  }

  //api call to get single member
  getMember(username: string) {
    //to reduce the api call to this one
    //we store the required member from the list of members already set
    const member = this.members().find(x => x.userName === username);
    if (member !== undefined) {
      //return member as an observable 
      return of(member);
    }

    // if members is not set then the api call happens.
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  //api call to update a member
  updateMember(member: Member) {
    //once the member is updated successfully in server then we also update that member in our members signal object

    //*NEED TO READ ABOUT WHAT IS TAP*//
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        this.members.update(
          members => members.map(
            m => m.userName === member.userName ? member : m
          )
        )
      })
    );
  }
}
