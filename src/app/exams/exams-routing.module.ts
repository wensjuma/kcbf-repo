import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigExamsComponent } from './config-exams/config-exams.component';
import { ViewExamComponent } from './view-exam/view-exam.component';


const routes: Routes = [
  {
    path: "",
    component:ConfigExamsComponent
  },
  {
    path: ":id",
    component:ViewExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
