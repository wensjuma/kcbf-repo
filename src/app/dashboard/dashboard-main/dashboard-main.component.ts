import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { multi, single } from 'src/app/charts/charts.data';
import { HttpService } from 'src/app/common/services/http.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  public single: any[];
  public multi: any[];

  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Interviews';
  public showYAxisLabel = true;
  public yAxisLabel = 'Scores';
  public colorScheme = {
    domain: ['#103366']
  }; 
  public autoScale = true;
  subs=  new SubSink()
  interviewCounts: any;
  form: FormGroup
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ) {
    Object.assign(this, {single, multi})   
    this.form = fb.group({
      date_time:[''],
      category:[''],
      stat_type:['']
    })
  }
  ngOnInit(){
    this.loadDashboardData()
  }
  loadDashboardData(){
  this.subs =  this.httpService.get("dashboard").subscribe((res) => {
      console.log(res);

      this.interviewCounts = res["data"];
      // this.profile_info = this.users.filter((res) => {
      //   return res.email_address === this.auth.currentUser.sub;
      // });
  })
}
  
  onChange(event) {
    console.log(event);
  }

}
