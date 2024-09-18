import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

//CanDeactivateFn gets triggered when we are trying to move out of the route
//this only works for Angular Routes
//this CanDeactivateFn is attached to MemberEditComponent
export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  //Since editForm is a part of the component hence we can access it to check if any editing has been done.
  if (component.editForm?.dirty) {
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost!!');
  }
  return true;
};
