import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { HttpService } from '../../../common/services/http.service';
import { ToasterAlertService } from '../../../common/services/toaster-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss']
})
export class EditJobDialogComponent implements OnInit {
  public _job: any;
  jobForm: FormGroup
  request_education_details: boolean
  request_cv: boolean
  request_apprenticeship: boolean
  request_scholarship: boolean
  request_guardian_details: boolean
  request_business_details: boolean
  request_siblings_details: boolean
  request_extra_documents: boolean
  request_residence_details: boolean
  category: any;
  imageURL: string;
  getInterview: any;
  selectedFile: Blob;
  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  serviceDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  minDate: any
  maxDate: any
  serviceTime: NgbTimeStruct = { hour: 8, minute: 0o0, second: 0o0 };
  created_interview: any;
  jobErrorMessage: unknown;
  errorMessage: unknown;
  imgPrefix: any;
  imgURL: string;
  fileName: any;
  title: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService,
    private matdialogRef: MatDialogRef<EditJobDialogComponent>,
    private router: Router
  ) {
    this._job = this._data.data
    this.fileName = this._data.data.upload?this._data.data.upload.file_name:''
    this.imgURL = this.httpService.imgPrefix + this.fileName
    if (!this._data.mode) {
      this.title="Create job"
      this.jobForm = this._fb.group({
        "application_end_date": [this._job.application_end_date, Validators.required],
        "job_field": [this._job.job_field, Validators.required],
        "work_location": [this._job.work_location, Validators.required],
        "category_id": [this._job.category.category_name, Validators.required],
        "min_salary": [this._job.min_salary, Validators.required],
        "max_salary": [this._job.max_salary, Validators.required],
        "job_type": [this._job.job_type, Validators.required],
        "job_title": [this._job.job_title, Validators.required],
        "description": [this._job.description],
        "qualifications": [this._job.qualifications, Validators.required],
        "role": [this._job.role, Validators.required]
      })
      this.request_education_details = this._job.config.request_education_details
      this.request_cv = this._job.config.request_cv
      this.request_apprenticeship = this._job.config.request_apprenticeship
      this.request_scholarship = this._job.config.request_scholarship
      this.request_guardian_details = this._job.config.request_guardian_details
      this.request_business_details = this._job.config.request_business_details
      this.request_siblings_details = this._job.config.request_siblings_details
      this.request_residence_details = this._job.config.request_residence_details
    } else {
      this.title="Edit job"
      this.jobForm = this._fb.group({
        "application_end_date": ["", Validators.required],
        "job_field": ["", Validators.required],
        "work_location": ["", Validators.required],
        "category_id": ["", Validators.required],
        "min_salary": ["", Validators.required],
        "max_salary": ["", Validators.required],
        "job_type": ["", Validators.required],
        "job_title": ["", Validators.required],
        "description": [""],
        "qualifications": ["", Validators.required],
        "role": ["", Validators.required]
      })
    }
  }
  loadJobCategories() {
    this.httpService.get("job/categories").subscribe((result) => {
      this.category = result["data"];
    });
  }
  ngOnInit(): void {
    this.loadJobCategories()      
  }
  showPreview(event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile)
  }

  loadInterviewDetails() {
    this.httpService.get(`interview/${this._data.data.interview_id}`).subscribe((result) => {
      this.getInterview = result["data"];
      sessionStorage.setItem("interview_job", JSON.stringify(this.getInterview));
    });
  }
  createJob(){
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
   this.httpService.post(`job/create`, formData)
     .subscribe((result) => {
    if (result["responseCode"] === "00") {
      this.toastrService.successAlerts(result["responseMessage"]);
      // this.router.navigate(["main/interviews/list/interviews"]);
      this.close()
    } else {
      for (let error of Object.values(result['errors'])) {
        this.errorMessage = error
      }
      this.toastrService.handleErrors(result);
    }
  });
  }
    editJob() {
      let application_date =moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
      const model = {
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
      this.httpService
        .put(`job/modify/${this._data.data.listing_id}`, formData)
        .subscribe((result) => {
          if (result["responseCode"] === "00") {  
            this.toastrService.successAlerts(result["responseMessage"]);
            sessionStorage.setItem("interview-details", JSON.stringify(result));
            // this.router.navigate(["main/interviews/list/interviews"]);
            this.close()
          } else {
            for (let error of Object.values(result['errors'])) {
              this.errorMessage = error
            }
            // this.errorMessage = result['errors']
            this.toastrService.handleErrors(result);
          }
        });
     }
  close() {
    this.matdialogRef.close();
  }

}
