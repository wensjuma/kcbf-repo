import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableInterviewsComponent } from './available-interviews/available-interviews.component';
import { ViewInterviewDetailsComponent } from './available-interviews/view/view-interview-details/view-interview-details.component';
import { ViewComponent } from './available-interviews/view/view.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';

import { InterviewDetailsComponent } from './create-interview/interview-components/interview-details/interview-details.component';
import { InterviewLocationComponent } from './create-interview/interview-components/interview-location/interview-location.component';
import { IntervieweeComponent } from "./interviewee.component";
import { ListIntervieweeComponent } from "./list-interviewee/list-interviewee.component";
import { PreInterviewPageComponent } from './pre-interview-page/pre-interview-page.component';
import { PreviewResponsesComponent } from './preview-responses/preview-responses.component';

const routes: Routes = [

  {
    path: "interviewee",
    component: IntervieweeComponent,
  },
  {
    path: "preview",
    component: PreviewResponsesComponent,
  },
  // {
  //   path: "questionnaire",
  //   component: QuestionnaireComponent,
  // },
  {
    path: "interviewees",
    component: ListIntervieweeComponent,
  },
  {
    path: "list/interviews",
    component: AvailableInterviewsComponent,
  },
  {
    path: "interview/:id",
    component: ViewComponent,

  },
  {
    path: "pre",
    component: PreInterviewPageComponent,
  },
  
  {
    path: "create-interview",
    component: CreateInterviewComponent,
    children: [
      
      {
        path: "location",
        component: InterviewLocationComponent,
      },
       {
        path: "interview-details",
        component: InterviewDetailsComponent,
      }, 
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewsRoutingModule { }
