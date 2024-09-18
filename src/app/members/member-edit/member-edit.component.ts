import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {

  /** 
   * The editForm template is actually considered as a child of the component
   * so we can use @ViewChild to access that template form and assign it to a variable
   * At first the component is initialised therefore the html elements may be null,
   * hence the optional parameter
  */
  @ViewChild('editForm') editForm?: NgForm;

  /**
   * The canDeactivateFn works only for Angular Routes.
   * For events that are performed from browser end like clicking home button, 
   * refresh tab button, close tab button. We need to acces HostListener
    @HostListener('click', ['$event.target']) onClick(btn) {
      console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    }
  */
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully!');
        this.editForm?.reset(this.member);
      }
    })

  }
}
