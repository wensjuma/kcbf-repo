import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './jobs-list/view/view.component';
import { ListApplicantsComponent } from './jobs-list/view/list-applicants/list-applicants.component';
import { ViewApplicantComponent } from './jobs-list/view/list-applicants/view-applicant/view-applicant.component';


@NgModule({
  declarations: [JobsListComponent, ViewComponent, ListApplicantsComponent, ViewApplicantComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
