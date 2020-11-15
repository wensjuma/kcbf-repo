import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntervieweeDialogComponent } from './list-interviewee/interviewee-dialog/interviewee-dialog.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { InterviewLocationComponent } from './create-interview/interview-components/interview-location/interview-location.component';
import { InterviewDetailsComponent } from './create-interview/interview-components/interview-details/interview-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailableInterviewsComponent } from './available-interviews/available-interviews.component';
import { AssignPanelistComponent } from './available-interviews/assign-panelist/assign-panelist.component';
import { ListIntervieweeComponent } from './list-interviewee/list-interviewee.component';
import { InterviewsRoutingModule } from './interviews-routing.module';
import { IntervieweeComponent } from './interviewee.component';
import { NotificationDialogComponent } from '../components/main-layout/notification-dialog/notification-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ViewInterviewDetailsComponent } from './available-interviews/view/view-interview-details/view-interview-details.component';
import { ViewPanelistDialogComponent } from './available-interviews/view/view-interview-details/view-panelist-dialog/view-panelist-dialog.component';
import { AddIntervieweeComponent } from './available-interviews/view/view-interview-details/add-interviewee/add-interviewee.component';
import { QuestionsDialogComponent } from './available-interviews/view/questions-dialog/questions-dialog.component';


import { ViewComponent } from './available-interviews/view/view.component';
import { ListPanelistsTabComponent } from './available-interviews/view/view-interview-details/list-panelists-tab/list-panelists-tab.component';
import { ListIntervieweesTabComponent } from './available-interviews/view/view-interview-details/list-interviewees-tab/list-interviewees-tab.component';

import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { PreviewResponsesComponent } from './preview-responses/preview-responses.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { InterviewStagesComponent } from './available-interviews/view/view-interview-details/interview-stages/interview-stages.component';
import { PanelistAwardsComponent } from './available-interviews/view/view-interview-details/list-interviewees-tab/panelist-awards/panelist-awards.component';
import { AddEditStageComponent } from './available-interviews/view/view-interview-details/interview-stages/add-edit-stage/add-edit-stage.component';
import { JobListingComponent } from './available-interviews/view/view-interview-details/job-listing/job-listing.component';
import { StepIntervieweesComponent } from './available-interviews/view/view-interview-details/interview-stages/step-interviewees/step-interviewees.component';
import { PreInterviewPageComponent } from './pre-interview-page/pre-interview-page.component';
// import { MatMarkdownEditorModule } from 'mat-markdown-editor';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

// import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
@NgModule({
  declarations: [
    IntervieweeComponent,
   
    ListIntervieweeComponent,
    
    IntervieweeDialogComponent,
    CreateInterviewComponent,
    InterviewLocationComponent,
    InterviewDetailsComponent,
    AddIntervieweeComponent,
    AvailableInterviewsComponent,
    AssignPanelistComponent,
    ViewInterviewDetailsComponent,
    ViewPanelistDialogComponent,
    QuestionsDialogComponent,

   
    ViewComponent,
    ListPanelistsTabComponent,
    ListIntervieweesTabComponent,
    PreInterviewPageComponent,
    PreviewResponsesComponent,
    InterviewStagesComponent,
    PanelistAwardsComponent,
    AddEditStageComponent,
    JobListingComponent,
    StepIntervieweesComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    InterviewsRoutingModule,
    NgbModule,
    CountdownModule,
    EditorModule,

    // MatDatepickerModule,
    // NgxMatMomentModule
   
    // MatMarkdownEditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[
    IntervieweeDialogComponent,
    AssignPanelistComponent,
    ViewPanelistDialogComponent,
    AddIntervieweeComponent,
    QuestionsDialogComponent,
   

    PanelistAwardsComponent,
    InterviewDetailsComponent,
    AddEditStageComponent,
    StepIntervieweesComponent
  ],
  providers:[
    { provide: CountdownGlobalConfig
    }//, useFactory: countdownConfigFactory }
    
  ]
})
export class InterviewsModule { }
// function countdownConfigFactory(): CountdownGlobalConfig {
//   return { format: `mm:ss` };
// }