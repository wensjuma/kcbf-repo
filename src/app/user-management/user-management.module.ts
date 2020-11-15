import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ApplicantUsersComponent } from './applicant-users/applicant-users.component';


@NgModule({
  declarations: [UsersComponent, CreateUserComponent, ApplicantUsersComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ]
  , entryComponents:[
    CreateUserComponent
  ]
})
export class UserManagementModule { }
