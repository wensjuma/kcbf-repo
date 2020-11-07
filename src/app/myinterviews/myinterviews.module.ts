import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyinterviewsRoutingModule } from './myinterviews-routing.module';
import { ListMyInterviewsComponent } from './list-my-interviews/list-my-interviews.component';
import { SharedModule } from '../shared/shared.module';
import { ViewsComponent } from './list-my-interviews/views/views.component';


@NgModule({
  declarations: [ListMyInterviewsComponent, ViewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MyinterviewsRoutingModule
  ]
})
export class MyinterviewsModule { }
