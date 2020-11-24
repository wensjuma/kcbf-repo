import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, ThemePalette, MatDialogRef } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { HttpService } from '../../../../../common/services/http.service';
import { ToasterAlertService } from '../../../../../common/services/toaster-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-interview-in-job',
  templateUrl: './create-interview-in-job.component.html',
  styleUrls: ['./create-interview-in-job.component.scss']
})
export class CreateInterviewInJobComponent implements OnInit {
  title: string;
  form: FormGroup
  @ViewChild("picker", {static: false}) picker: any;

public date: moment.Moment;
public disabled = false;
public showSpinners = true;
public showSeconds = false;
public touchUi = false;
public enableMeridian = false;
public minDate: moment.Moment;
public maxDate: moment.Moment;
public stepHour = 1;
public stepMinute = 1;
  public stepSecond = 1;
  errorMessage: string;
public color: ThemePalette = "primary";
public listColors = ["primary", "accent", "warn"];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  serviceDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  submitted: boolean;
  rooms: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public  _data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService,
    private dialogRef: MatDialogRef<CreateInterviewInJobComponent>
  ) {
    if(_data.mode){
      this.title = "Create interview"
      
      this.form = this._fb.group({
        interview_name: [
          "",
          Validators.required
        ],
        location_id: [
          null,
          Validators.required
        ],
        start_date: [
         ""
        ],
        description: [""],
        session_length: [
           "",
          Validators.required
        ]   
      });
    } else {
      this.title = "Edit interview"
      // this.sec_title = "Edit job"
      this.form = this._fb.group({
        interview_name: [
          this._data.data.interview_name,
          Validators.required
        ],
        location_id: [
           this._data.data.location_name,
          Validators.required
        ],
        start_date: [
          this._data.data.start_date
        ],
        description: [this._data.data.description],
        session_length: [
          this._data.data.session_length_min,
          Validators.required
        ]   
      });
    }
  }
  ngOnInit(): void {
    this.loadRooms()
  }
  loadRooms() {
    this.httpService.get("locations").subscribe((result) => {
      this.rooms = result["data"];
    });
  }
  createInterview() {
    let interview_date =moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
     this.submitted = true
     const model = {
       interview_name: this.form.value.interview_name,
       description: this.form.value.description,
       session_length_min: this.form.value.session_length,
       location_id: Number(this.form.value.location_id),
       start_date: interview_date,
       job_listing: null
     }; 
   sessionStorage.setItem('form-model',JSON.stringify(model))
     this.httpService.post(`interview/create/${this._data.job}`, model).subscribe((result) => {
       if (result["responseCode"] === "00") {
         // this.created_interview = result.data
         this.toastrService.successAlerts(result["responseMessage"]);
         sessionStorage.setItem("interview-details", JSON.stringify(result));
        //  this.router.navigate(["main/interviews/list/interviews"]);
       } else {
         this.toastrService.handleErrors(result);
       }
     });
  }
  editInterview() {
    let interview_date =moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
     this.submitted = true
     const model = {
       interview_name: this.form.value.interview_name,
       description: this.form.value.description,
       session_length_min: this.form.value.session_length,
       location_id: Number(this.form.value.location_id),
       start_date: interview_date,
       job_listing: null
     }; 
   sessionStorage.setItem('form-model',JSON.stringify(model))
     this.httpService.put(`interview/${this._data.data.interview_id}`, model).subscribe((result) => {
       if (result["responseCode"] === "00") {
         // this.created_interview = result.data
         this.toastrService.successAlerts(result["responseMessage"]);
         sessionStorage.setItem("interview-details", JSON.stringify(result));
        //  this.router.navigate(["main/interviews/list/interviews"]);
       } else {
         this.toastrService.handleErrors(result);
       }
     });
  }
  close() {
    this.dialogRef.close()
  }

}
