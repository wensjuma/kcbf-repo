import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from '../charts/charts.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { InterviewScoresGraphComponent } from './interview-scores-graph/interview-scores-graph.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoPanelCardsComponent } from './info-panel-cards/info-panel-cards.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    InterviewScoresGraphComponent,
    InfoPanelCardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ChartsModule,
    NgxChartsModule,
    NgbModule
  ]

})
export class DashboardModule { }
