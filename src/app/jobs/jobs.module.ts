import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './jobs-list/view/view.component';
import { ListApplicantsComponent } from './jobs-list/view/list-applicants/list-applicants.component';
import { ViewApplicantComponent } from './jobs-list/view/list-applicants/view-applicant/view-applicant.component';
import { AcceptedApplicationsComponent } from './jobs-list/view/list-applicants/accepted-applications/accepted-applications.component';
import { RejectedApplicationsComponent } from './jobs-list/view/list-applicants/rejected-applications/rejected-applications.component';
import { EditJobDialogComponent } from './jobs-list/edit-job-dialog/edit-job-dialog.component';
import { InterviewInJobComponent } from './jobs-list/view/interview-in-job/interview-in-job.component';
import { CreateInterviewInJobComponent } from './jobs-list/view/interview-in-job/create-interview-in-job/create-interview-in-job.component';


@NgModule({
  declarations: [JobsListComponent, ViewComponent, ListApplicantsComponent, ViewApplicantComponent, AcceptedApplicationsComponent, RejectedApplicationsComponent, EditJobDialogComponent, InterviewInJobComponent, CreateInterviewInJobComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule
  ],
  entryComponents: [
    EditJobDialogComponent,
    CreateInterviewInJobComponent
  ]
})
export class JobsModule { }
