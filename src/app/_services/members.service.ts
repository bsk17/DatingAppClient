import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //function based injection
  private http = inject(HttpClient);

  //we have created environment variables for production and development.
  baseUrl = environment.apiUrl;

  //api call to get all the members
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  //api call to get single member
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
