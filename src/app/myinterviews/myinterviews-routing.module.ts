import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMyInterviewsComponent } from './list-my-interviews/list-my-interviews.component';
import { ViewsComponent } from './list-my-interviews/views/views.component';


const routes: Routes = [
  {
    path: '',
    component: ListMyInterviewsComponent
  },
  {
    path: ':id',
    component: ViewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyinterviewsRoutingModule { }
