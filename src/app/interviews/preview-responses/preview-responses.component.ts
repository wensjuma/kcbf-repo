import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';

import { Router } from '@angular/router';
import { ResultsDialogComponent } from 'src/app/exams/view-exam/questionnaire/results-dialog/results-dialog.component';

@Component({
  selector: 'app-preview-responses',
  templateUrl: './preview-responses.component.html',
  styleUrls: ['./preview-responses.component.css']
})
export class PreviewResponsesComponent implements OnInit {
  stored_response: any;
  interview_details: any;
  start_interview_details: any;
  start_interview: any;
  outcome: any;
  final_score: any;

  constructor(
    private dialog: MatDialog,
    private httpService: HttpService,
    private  router: Router
  ) { 
    this.stored_response = JSON.parse(localStorage.getItem('store_response'))
    console.log(this.stored_response);
    this.interview_details = JSON.parse(
      sessionStorage.getItem("interview_more")
    )
    this.start_interview_details = JSON.parse(
      sessionStorage.getItem("startinterview_data")
      
    );
    // this.final_score = JSON.parse(
    //   sessionStorage.getItem("score_totals")
    // ); 
    
  }
  viewResults(res) {
    // this.router.navigate(['main/interviews/preview'])
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: {
        data: res,
        interviewee: this.start_interview_details
      },
      disableClose: true,
      width: "600px",
    });
  }
  editResponse(response) {
   this.router.navigate(['main/interviews/interviewee'])
  }
  backToInterview() {
   this.router.navigate(['main/interviews/interviewee'])
  }
  endActualInterview() {
    const model = {
      interview_score: 0,
      interview_id: this.interview_details.interview_id,
      recommendation: "end interview",
    };
    this.httpService
      .put(
     `interviewee/${this.start_interview_details.intervieweeId}/start/${this.interview_details.interview_id}`,
        model
      )
      .subscribe((result) => {
        // console.log(result);
        this.outcome = result["data"];
        console.log(this.outcome);
        if (result["responseCode"] === "00") {
          sessionStorage.setItem("outcome", JSON.stringify(this.outcome));
          this.viewResults(this.outcome);
        }
      });
  }
  ngOnInit() {
  }

}
