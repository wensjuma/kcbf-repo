import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { CountdownComponent } from "ngx-countdown";

import { HttpService } from "../common/services/http.service";
import { CreatePanelistDialogComponent } from "../panelists/create-panelist-dialog/create-panelist-dialog.component";

@Component({
  selector: "app-interviewee",
  templateUrl: "./interviewee.component.html",
  styleUrls: ["./interviewee.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class IntervieweeComponent implements OnInit {
  interviewDetails: any;
  interviewee: any;
  questions: any;
  action: boolean;
  page = 1;
  pageSize = 20;
  items: any;
  data_result: any;
  option_result: any;
  interview_details: any;
  start_interview_details: any;
  start_interview: any;
  outcome: any;
  timeData :number;
  score_array: number[];
  final_score: any;
  form: FormGroup;
  timeout: boolean;
  total_score_array: number[];
  responses: any[] 
  _responses: any
  constructor(
    private _formBuilder: FormBuilder,
    private httpService: HttpService,
    private dialog: MatDialog,
    private _elementRef: ElementRef,
    private router: Router
  ) {
    this.responses =[]
    this.interview_details = JSON.parse(
      sessionStorage.getItem("interview_more")
    )
    this._responses = JSON.parse(
      sessionStorage.getItem("responses")
    )
    // console.log(this._responses);
    // this._responses.map(res=>{
       this.form = this._formBuilder.group({
      responseOption: new FormControl(null, [Validators.required]),
  
    })
   
    // this.form = this._formBuilder.group({});
    // this.questionss.forEach(question => {
    //   this.form.addControl(question.name, this._formBuilder.control(null, Validators.required));
    // })
    this.timeData= this.interview_details.session_length_min * 60
    this.score_array = [];
    this.total_score_array = [];
  }

  ngOnChanges() {
  
    if (this.timeData <= 1000) {
      this.timeout = true;
    }
  }
  loadInterviewQuestions() {
    this.start_interview_details = JSON.parse(
      sessionStorage.getItem("startinterview_data")
    );
    this.httpService
      .get(`interview/${this.interview_details.interview_id}/questions`)
      .subscribe((res) => {     
        this.questions = res.data;
      });
  }
  getValue(evt, data) {

    data.options.forEach(item => {
      if (item.optionId !== evt.optionId) {
        item.selected = false;
      } else {
        item.selected = true;
      }
    }) 
    data.answered = true
    data.scored = evt.score;
    this.option_result = evt.score;
    this.data_result = evt.score;
    const model = {
      question_id: data.questionId,
      option_id: evt.optionId,
      notes: "Test notes",
      score: evt.score
    };
    // console.log(model);
    this.responses.push(data)
    sessionStorage.setItem(
      "responses",
      JSON.stringify(this.responses)
    );
    this.httpService
      .put(
        `interviewee/${this.start_interview_details.intervieweeId}/score/${this.interview_details.interview_id}`,
        model
      )
      .subscribe((res) => {
        const store_res = evt;  
        // store responses incase you want to edit 
        res['data'].selected = true
        this.responses.push(res['data'])
        sessionStorage.setItem(
          "responses",
          JSON.stringify(this.responses)
        );
        store_res["question"] = data.question;
        this.score_array.push(store_res);
        this.total_score_array.push(res.data.score);
        localStorage.setItem(
          "store_response",
          JSON.stringify(this.score_array)
        );
        this.final_score = this.total_score_array.reduce(function(a, b){ return a + b; })
      });
      sessionStorage.setItem(
        "score_totals",
        JSON.stringify(this.final_score)
      );
  }
  viewResults() {
    this.router.navigate(["main/interviews/preview"]);
  }
  ngOnInit() {
    this.loadInterviewQuestions();
    this.interviewDetails = JSON.parse(
      sessionStorage.getItem("interview-details")
    ); 
    this.interviewee = JSON.parse(sessionStorage.getItem("interviewee"));
  }

  ngAfterViewInit() { }
  
  radioChecked(id, i){
    this.responses.forEach(item=>{
      if(item.optionId !== id){ 
         item.selected = false;
      }else{
        item.selected = true;
        console.log(this.responses);
        
      } 
    })
  }
}
