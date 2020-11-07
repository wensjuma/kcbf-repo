import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.css']
})
export class QuestionsDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<QuestionsDialogComponent>
  ) { }

  ngOnInit() {
  }
  createQuestions(){
    this.router.navigate(["main/interviews/questionnaire"]);
    this.dialogRef.close()
  }
  viewQuestions(){

    this.router.navigate(["main/interviews/interviewee"]);
    this.dialogRef.close()
  }

}
