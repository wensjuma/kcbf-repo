import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "src/app/common/services/http.service";
import { NgbDatepickerConfig, NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { GlobalService } from "src/app/common/services/global.service";
import * as moment from "moment";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";
import { MatDialogRef, MAT_DIALOG_DATA, ThemePalette } from "@angular/material";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatMarkdownEditorOptions } from 'mat-markdown-editor';

@Component({
  selector: "app-interview-details",
  templateUrl: "./interview-details.component.html",
  styleUrls: ["./interview-details.component.scss"],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class InterviewDetailsComponent implements OnInit {
//Date time picker
@ViewChild("picker", {static: true}) picker: any;

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
public color: ThemePalette = "primary";
public listColors = ["primary", "accent", "warn"];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  form: FormGroup;
  serviceDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  serviceTime: NgbTimeStruct = { hour: 8, minute: 0o0, second: 0o0 };
  seconds = true;
  locations: any;
  editForm: any;
  jobForm: FormGroup
  init = {
    menubar: false,
    toolbar:
      "undo redo | formatselect | " +
      "bold italic | alignleft aligncenter" +
      "alignright alignjustify | bullist numlist outdent indent |" +
      "removeformat",
  };
  add_listing_option: boolean;
  description: any 
  public options: MatMarkdownEditorOptions = {
    enablePreviewContentClick: false,
    resizable: true,
    showBorder: true,
    hideIcons: {},
    hideToolbar: false,
    height: '500px',
    mode: 'editor',
    toolbarColor: 'primary',
    preRender: this.preRender,
  };
  title: string;
  category: any;
  created_interview: any;
  interview_date: string;
 
  preRender(markDown: any) {
    // Here you have access to the markdown binding
    // before it is rendered
    return markDown;
  }
  submitted: boolean = false
  constructor(
    private httpService: HttpService,
    private _fb: FormBuilder,
    private router: Router,
    private toastrService: ToasterAlertService,
    private globalService: GlobalService,
    private config: NgbDatepickerConfig,
    private dialogRef: MatDialogRef<InterviewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    const current = new Date();
    config.minDate = { year: current.getFullYear(), month: 
    current.getMonth() + 1, day: current.getDate()+ 1 };
    config.outsideDays = 'hidden';

    console.log(this._data);
    
    this.editForm = JSON.parse(sessionStorage.getItem("edit_interview_data"));
    this.form = this._fb.group({
      interview_name: [
        this._data.data ? this._data.data.interview_name : "",
        Validators.required,
      ],
      location_id: [
        this._data.data ? this._data.data.location_name : null,
        Validators.required,
      ],
      start_date: [
        this._data.data ? this._data.data.start_date:""
      ],
      // time: [
      //   this.serviceTime
      // ],

      // date_time: ['', Validators.required],
      description: [this._data.data ? this._data.data.description : ""],
      session_length: [
        this._data.data ? this._data.data.session_length_min : "",
        Validators.required,
      ],
      // start_date: [
      //   // this._data.data ? this._data.data.start_date : "",
      //   // Validators.required,
      //   this.serviceDate
      // ],
   
    });
    // console.log(this._data.data.start_date.split('T')[0]);
   
    this.location.setValue(this._data.data.location_name);
  
    // this.form.get('location_id').setValue(this._data.data.location_name);
    this.jobForm = this._fb.group({
      "application_end_date":[null, Validators.required],
      "job_field": [null, Validators.required],
      "work_location": [null, Validators.required],
      "category_id": [null, Validators.required],
      "min_salary": [null, Validators.required],
      "max_salary": [null, Validators.required],
      "job_type": [null, Validators.required],
      "job_title": [null, Validators.required],
      "description": [''],
      "qualifications":[null, Validators.required],
      "role":[null, Validators.required]
    })
    if(_data.mode){
      this.title = "Create interview"
    }else{
      this.title = "Edit interview"
    }
    // console.log(this._data.data);
  }
  get location() {return this.form.get('location_id')}; 
  ngOnInit() {
    this.httpService.get("locations").subscribe((result) => {
      // console.log(result);
      this.locations = result["data"];
    });
    this.loadJobCategories()
  }
  onSubmit(service) {
    if (this._data.mode) {
      this.createInterview(service);
    } else {    
      this.editInterview(service);
    }
  }
  loadJobCategories(){
      this.httpService.get("job/categories").subscribe((result) => {
        this.category = result["data"];
        // console.log(this.category);
      });
    
  }
  createInterview(service) {
    // console.log(this.form.value.description);
    // const serviceDate = this.globalService.transformDate(service.start_date._d);
   let interview_date =moment(service.start_date._d).format('DD-MM-YYYY hh:mm');
    
    
    // const serviceTime = this.globalService.transformTime(service.time);
    // console.log(serviceDate + ' ' + serviceTime);
    this.submitted = true
    const model = {
      interview_name: this.form.value.interview_name,
      description: this.form.value.description,
      session_length_min: this.form.value.session_length,
      location_id: Number(this.form.value.location_id),
      start_date: interview_date,
      job_listing: null
    }; 
    console.log(model);
    
  sessionStorage.setItem('form-model',JSON.stringify(model))
    this.httpService.post("interview/create", model).subscribe((result) => {
      console.log(result);
      if (result["responseCode"] === "00") {
        // this.created_interview = result.data
        
        this.toastrService.successAlerts(result["responseMessage"]);
        sessionStorage.setItem("interview-details", JSON.stringify(result));
        this.router.navigate(["main/interviews/list/interviews"]);
      } else {
        this.toastrService.handleErrors(result);
      }
    });
  }
submitInterviewJob(){
  this.created_interview =JSON.parse(sessionStorage.getItem("interview-details"));
 
 const  model ={
  "application_end_date":this.jobForm.value.application_end_date,
  "job_field": this.jobForm.value.job_field,
  "work_location": this.jobForm.value.work_location,
  "category_id": Number(this.jobForm.value.category_id),
  "min_salary": Number(this.jobForm.value.min_salary),
  "max_salary": Number(this.jobForm.value.max_salary),
  "job_type": this.jobForm.value.job_type,
  "job_title": this.jobForm.value.job_title,
  "description":this.jobForm.value.description,
  "qualifications":this.jobForm.value.qualifications,
  "role": this.jobForm.value.role
 }
 
 this.httpService.post(`job/modify/${this.created_interview.data.interview_id}`, model)
 .subscribe((result) => {
   console.log(result);  
  if (result["responseCode"] === "00") {
    this.toastrService.successAlerts(result["responseMessage"]);
    this.router.navigate(["main/interviews/list/interviews"]);
  } else {
    this.toastrService.handleErrors(result);
  }
});
}
  editInterview(service) {
  const interview_date =moment(service.start_date._d).format('DD-MM-YYYY, hh:mm');
    // console.log(serviceDate + ' ' + serviceTime);
    const model = {
      interview_name: this.form.value.interview_name,
      description: this.form.value.description,
      session_length_min: this.form.value.session_length,
      location_id: Number(this.form.value.location_id),
      start_date:interview_date
    };
    console.log(model);
    this.httpService
      .put(`interview/${this._data.data.interview_id}`, model)
      .subscribe((result) => {
      console.log(result);
 
        if (result["responseCode"] === "00") {
          this.toastrService.successAlerts(result["responseMessage"]);
          sessionStorage.setItem("interview-details", JSON.stringify(result));
          this.router.navigate(["main/interviews/list/interviews"]);
        } else {
          this.toastrService.handleErrors(result);
        }
      });
  }
  close() {
    this.dialogRef.close();
  }
  get descriptionControl() {
    return this.form.controls.description as FormControl;
  }
  toggleJobListing(event: any) {
    if(this.add_listing_option){
      this.add_listing_option = false
    }else{
      this.add_listing_option = true
    } 
  }
}
