import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ApplicantUsersComponent } from './applicant-users/applicant-users.component';
import { ViewApplicantComponent } from './applicant-users/view-applicant/view-applicant.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'applicants',
    component: ApplicantUsersComponent
  },
  {
    path: 'applicant/:id',
    component: ViewApplicantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
