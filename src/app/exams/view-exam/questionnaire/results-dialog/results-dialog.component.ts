import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';
import { HttpService } from "src/app/common/services/http.service";

@Component({
  selector: "app-results-dialog",
  templateUrl: "./results-dialog.component.html",
  styleUrls: ["./results-dialog.component.scss"],
})
export class ResultsDialogComponent implements OnInit {
  details: any;
  interviewee: any;
  interviewee_details: any
  interview_id: any;
  constructor(
    private dialogRef: MatDialogRef<ResultsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private results: any,
    private httpService: HttpService,
    private router: Router
  ) {
    this.interviewee = JSON.parse(sessionStorage.getItem('startinterview_data'));
    this.interview_id = JSON.parse(sessionStorage.getItem('interview_more')).interview_id
  }
 

  ngOnInit() {
    this.loadResults();
    console.log(this.interviewee);
    console.log(this.results);
    
  }
  loadResults() { 
    this.httpService
      .get(`/interviewee/${this.interviewee.intervieweeId}/results`)
      .subscribe((res) => {
        this.details = res["data"]?  res["data"].reverse()[0]:'';
        console.log(res);
      });
  }
  close() {
    this.router.navigate([`main/interviews/interview/${this.interview_id}`])
    this.dialogRef.close();

  }
}
