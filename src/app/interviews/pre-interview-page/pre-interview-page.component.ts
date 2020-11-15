import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';

@Component({
  selector: 'app-pre-interview-page',
  templateUrl: './pre-interview-page.component.html',
  styleUrls: ['./pre-interview-page.component.css']
})
export class PreInterviewPageComponent implements OnInit {
  start_interview: any
  interview_details: any;
  interviewee_details: any;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private alertService: ToasterAlertService

  ) {
    this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
    this.interviewee_details = JSON.parse(sessionStorage.getItem("startinterview_data"));
    console.log(this.interviewee_details);
    // startinterview_data
   }
  ngOnInit() {
  }
  startActualInterview(){
    const model={
      interview_score: 0,
      interview_id: this.interview_details.interview_id,
      recommendation: "Started interview"
    } 
    this.httpService
    .put(`interviewee/${this.interviewee_details.intervieweeId}/start/${this.interview_details.interview_id}`, model)
      .subscribe((result) => {   
        this.start_interview = result["data"];
        console.log(this.start_interview);
        if(result['responseCode'] === '00'){
          sessionStorage.setItem(
            "startinterview",
            JSON.stringify(this.start_interview)
          );
          // sessionStorage.setItem("startinterview_data", JSON.stringify(data));
         this.router.navigate(['main/interviews/interviewee'])
        }else{
          this.alertService.handleErrors(result)
        }
      });
  }
}
