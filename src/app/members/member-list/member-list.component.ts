import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);

  ngOnInit(): void {
    //members need to be loaded only if they are not already loaded and set by memberService
    //this helps in reducing the api call to get the list of members
    //now the application will not call this api everytime we get to members page
    //it will be called only once and get set into signal object member 
    //afterwards that signal object will be used in all places
    if (this.memberService.members().length === 0) {
      this.loadMembers();
    }
  }

  //call getMembers() from MemberService
  //assign the return values to the members variable
  loadMembers() {
    this.memberService.getMembers();
  }
}
