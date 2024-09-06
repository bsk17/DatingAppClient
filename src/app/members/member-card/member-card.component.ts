import { Component, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  //member-list component fetches all the members
  //pass each member of those list of members as input parameter to each member-card
  //member-card is a child of member-list
  //member will be a signal property so we need to use it like signal [member().property] inside html
  member = input.required<Member>();
}
