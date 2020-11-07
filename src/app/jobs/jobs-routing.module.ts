import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { ViewComponent } from './jobs-list/view/view.component';
import { ViewApplicantComponent } from './jobs-list/view/list-applicants/view-applicant/view-applicant.component';


const routes: Routes = [
  {
    path:'',
    component: JobsListComponent
  },
  {
    path:':id',
    component: ViewComponent
  },
  {
    path:'new/:id/applicant/:id',
    component: ViewApplicantComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
