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
  update_submitted: boolean;
  get_interview: any;
  private _job: any;
  sec_title: string;
  edit_listing_option: boolean;
  errorMessage: any;
  selectedFile: any;
  url: any;
  uploadForm: any;
  imageURL: string;
  valid_interview: boolean;
  jobErrorMessage: unknown;
  preRender(markDown: any) {

    return markDown;
  }
  submitted: boolean = false
  request_education_details: boolean
  request_cv: boolean
  request_apprenticeship: boolean
  request_scholarship: boolean
  request_guardian_details: boolean
  request_business_details: boolean
  request_siblings_details: boolean
  request_extra_documents: boolean
  request_residence_details: boolean
  constructor(
    private httpService: HttpService,
    private _fb: FormBuilder,
    private router: Router,
    private toastrService: ToasterAlertService,
    private config: NgbDatepickerConfig,
    private dialogRef: MatDialogRef<InterviewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {
    const current = new Date();
    this.config.minDate = { year: current.getFullYear(), month: 
    current.getMonth() + 1, day: current.getDate()+ 1 };
    this.config.outsideDays = 'hidden';
    this.editForm = JSON.parse(sessionStorage.getItem("edit_interview_data"));
    httpService.get(`job/listing/${this._data.data.interview_id}`)
      .subscribe(res => {
      console.log(res);
      
    })
    if(_data.mode){
      this.title = "Create interview"
      this.sec_title = "Create job"
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
      this.loadInterviewDetails()
      this.title = "Edit interview"
      this.sec_title = "Edit job"
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
  showPreview(event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    // this.uploadForm.patchValue({
    //   avatar: file
    // });
    // this.uploadForm.get('avatar').updateValueAndValidity()
 
 
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile)
  }
  loadInterviewDetails() {
    this.httpService.get(`interview/${this._data.data.interview_id}`).subscribe((result) => { 
      this.get_interview = result["data"];  
      sessionStorage.setItem("interview_job", JSON.stringify(this.get_interview));
    });
  }
  // get location() {return this.form.get('location_id')}; 
  ngOnInit() {
    if (this._data.data.job_listing) {
       this._job = JSON.parse(sessionStorage.getItem('interview_job')).job_listing;
    } else {
      sessionStorage.removeItem('interview_job')
    } 
    if (this._job) {
      this.jobForm = this._fb.group({
        "application_end_date":[this._job.application_end_date, Validators.required],
        "job_field": [this._job.job_field, Validators.required],
        "work_location": [this._job.work_location, Validators.required],
        "category_id": [this._job.category.category_name, Validators.required],
        "min_salary": [this._job.min_salary, Validators.required],
        "max_salary": [this._job.max_salary, Validators.required],
        "job_type": [this._job.job_type, Validators.required],
        "job_title": [this._job.job_title, Validators.required],
        "description": [this._job.description],
        "qualifications":[this._job.qualifications, Validators.required],
        "role":[this._job.role, Validators.required]
      })
      this.request_education_details =this._job.config.request_education_details
  this.request_cv=this._job.config.request_cv
  this.request_apprenticeship=this._job.config.request_apprenticeship
  this.request_scholarship=this._job.config.request_scholarship
  this.request_guardian_details=this._job.config.request_guardian_details
  this.request_business_details=this._job.config.request_business_details
  this.request_siblings_details=this._job.config.request_siblings_details
  this.request_residence_details= this._job.config.request_residence_details
    } else {
      this.jobForm = this._fb.group({
        "application_end_date":[ null, Validators.required],
        "job_field": [null, Validators.required],
        "work_location": [ null, Validators.required],
        "category_id": [null, Validators.required],
        "min_salary": [null, Validators.required],
        "max_salary": [null, Validators.required],
        "job_type": [null, Validators.required],
        "job_title": [null, Validators.required],
        "description": [''],
        "qualifications":[null, Validators.required],
        "role": [null, Validators.required] 
      })
 }
    this.httpService.get("locations").subscribe((result) => {
      this.locations = result["data"];
    });
    this.loadJobCategories()
    // this.getInterviewById()
  }
  onSubmit(service) {
    const currentYear = moment().year();
    this.minDate = moment([currentYear - 1, 0, 1]);
    this.maxDate = moment([currentYear + 1, 11, 31]);
    if (this._data.mode) {
      this.createInterview(service);
    } else {    
     this.editInterviewOnly();
    }
  }
  loadJobCategories(){
      this.httpService.get("job/categories").subscribe((result) => {
        this.category = result["data"];
      });
    
  }
  selectFile(event: any) {
    this.selectedFile = event.target.files[0]
    this.url = this.selectedFile.name
  }
  createInterview(service) {
   let interview_date =moment(service.start_date._d).format('DD-MM-YYYY hh:mm');
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
    this.httpService.post("interview/create", model).subscribe((result) => {
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
  let application_date =moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
 const  model ={
  "application_end_date": application_date,
  "job_field": this.jobForm.value.job_field,
  "work_location": this.jobForm.value.work_location,
  "category_id": Number(this.jobForm.value.category_id),
  "min_salary": Number(this.jobForm.value.min_salary),
  "max_salary": Number(this.jobForm.value.max_salary),
  "job_type": this.jobForm.value.job_type,
  "job_title": this.jobForm.value.job_title,
  "description":this.jobForm.value.description,
  "qualifications":this.jobForm.value.qualifications,
   "role": this.jobForm.value.role,
   "config": {
    "request_education_details": this.request_education_details,
    "request_cv": this.request_cv,
    "request_apprenticeship": this.request_apprenticeship,
    "request_scholarship": this.request_scholarship,
    "request_guardian_details": this.request_guardian_details,
    "request_business_details": this.request_business_details,
    "request_siblings_details": this.request_siblings_details,
    "request_extra_documents": this.request_extra_documents,
    "request_residence_details": this.request_residence_details
}
 }
  const formData = new FormData()
  formData.append('data', JSON.stringify(model))
  formData.append('file', this.selectedFile)
 this.httpService.post(`job/modify/${this.created_interview.data.interview_id}`, formData)
 .subscribe((result) => {
  if (result["responseCode"] === "00") {
    this.toastrService.successAlerts(result["responseMessage"]);
    this.router.navigate(["main/interviews/list/interviews"]);
    this.close()
  } else {
    for (let error of Object.values(result['errors'])) {
      this.jobErrorMessage = error
    }
    this.toastrService.handleErrors(result);
  }
});
}
  // editJob() {
  //   let application_date =moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
  //   const model = {
  //        "application_end_date": application_date,
  //       "job_field": this.jobForm.value.job_field,
  //       "work_location": this.jobForm.value.work_location,
  //       "category_id": Number(this.jobForm.value.category_id),
  //       "min_salary": Number(this.jobForm.value.min_salary),
  //       "max_salary": Number(this.jobForm.value.max_salary),
  //       "job_type": this.jobForm.value.job_type,
  //       "job_title": this.jobForm.value.job_title,
  //       "description":this.jobForm.value.description,
  //       "qualifications":this.jobForm.value.qualifications,
  //       "role": this.jobForm.value.role,
  //       "config": {
  //         "request_education_details": this.request_education_details,
  //         "request_cv": this.request_cv,
  //         "request_apprenticeship": this.request_apprenticeship,
  //         "request_scholarship": this.request_scholarship,
  //         "request_guardian_details": this.request_guardian_details,
  //         "request_business_details": this.request_business_details,
  //         "request_siblings_details": this.request_siblings_details,
  //         "request_extra_documents": this.request_extra_documents,
  //         "request_residence_details": this.request_residence_details
  //     }
  //   }
  //   const formData = new FormData()
  //   formData.append('data', JSON.stringify(model))
  //   formData.append('file', this.selectedFile)
  //   this.httpService
  //     .put(`job/modify/${this._data.data.interview_id}`, formData)
  //     .subscribe((result) => {
  //       if (result["responseCode"] === "00") {  
  //         this.toastrService.successAlerts(result["responseMessage"]);
  //         sessionStorage.setItem("interview-details", JSON.stringify(result));
  //         this.router.navigate(["main/interviews/list/interviews"]);
  //         this.close()
  //       } else {
  //         for (let error of Object.values(result['errors'])) {
  //           this.errorMessage = error
  //         }
  //         // this.errorMessage = result['errors']
  //         this.toastrService.handleErrors(result);
  //       }
  //     });
  //  }
  editInterview() {
    this.update_submitted = true
    const interview_date = moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
    
    const model = {
      interview_name: this.form.value.interview_name,
      description: this.form.value.description,
      session_length_min: this.form.value.session_length,
      location_id: Number(this.form.value.location_id),
      start_date: interview_date,
      job_listing: null

    }; 
    console.log(model);
    this.httpService
      .put(`interview/${this._data.data.interview_id}`, model)
      .subscribe((result) => {

        if (result["responseCode"] === "00") {
          this.valid_interview = true
          this.toastrService.successAlerts(result["responseMessage"]);
          sessionStorage.setItem("interview-details", JSON.stringify(result));
          this.router.navigate(["main/interviews/list/interviews"]);
          
        } else {
          for (let error of Object.values(result['errors'])) {
            this.errorMessage = error
          }
          // this.errorMessage = result['errors']
          this.toastrService.handleErrors(result);
        }
      });
  }
  editInterviewOnly() {
    this.update_submitted = true
    const interview_date = moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
    const model = {
      interview_name: this.form.value.interview_name,
      description: this.form.value.description,
      session_length_min: this.form.value.session_length,
      location_id: Number(this.form.value.location_id),
      start_date: interview_date,
      job_listing:null
    };
    this.httpService
      .put(`interview/${this._data.data.interview_id}`, model)
      .subscribe((result) => {
        if (result["responseCode"] === "00") { 
          this.toastrService.successAlerts(result["responseMessage"]);
          sessionStorage.setItem("interview-details", JSON.stringify(result));
          this.router.navigate(["main/interviews/list/interviews"]);
          // this.close()
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
    event;
    if(this.add_listing_option){
      this.add_listing_option = false
    }else{
      this.add_listing_option = true
    } 
  }
  toggleJobListingEdit(event) {
    event;
    if(this.edit_listing_option){
      this.edit_listing_option = false
    }else{
      this.edit_listing_option = true
    } 
  }
}
