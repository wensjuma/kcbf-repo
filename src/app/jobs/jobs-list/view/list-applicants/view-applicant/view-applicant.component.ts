import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../common/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterAlertService } from '../../../../../common/services/toaster-alert.service';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.scss']
})
export class ViewApplicantComponent implements OnInit {
  applicant_id: any;
  job_details: any;
  applicant_details: any;
  works: any;
  education_history: any;
  uploaded_file: any;
  subs = new SubSink()

  constructor(
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private alertService: ToasterAlertService,
    private router: Router
  ) { 
    this.applicant_id = this.activeRoute.snapshot.paramMap.get("id");
    this.job_details = JSON.parse(sessionStorage.getItem("jobdetails"));  
  }

  ngOnInit() {
    this.loadApplicantInfo()
    this.loadApplicantWorkExperience()
    this.loadApplicantEducation()
    this.loadApplicantDocuments()
  }
  loadApplicantInfo() {
    this.httpService.get(`application/${this.applicant_id}`)
      .subscribe(res => {
     this.applicant_details = res['data']
       
    })
  }
  loadApplicantWorkExperience() {
    this.httpService.get(`application/${this.applicant_id}/employment/history`)
      .subscribe(res => {
        this.works = res['data']       
    })
  }
  loadApplicantEducation() {
    this.httpService.get(`application/${this.applicant_id}/education/history`)
      .subscribe(res => {
        this.education_history = res['data']       
    })
  }
  loadApplicantDocuments() {
    this.httpService.get(`application/${this.applicant_id}/documents`)
      .subscribe(res => {
        this.uploaded_file = res['data']  
        console.log(this.uploaded_file);
        
    })
  }
  acceptApplication(data: any) {
    
    Swal.fire({
      // title: 'Are you sure want to delete?',
      text: 'Sure to Accept this application?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.subs = this.httpService.delete(`location/${data.location_id}`).subscribe(res=>{
          if(res['responseCode']=== '00'){
            Swal.fire(
              'Accepted !',
              'Application accepted',
              'success'
            )
           this.loadApplicantInfo()
          }else{
           this.alertService.handleErrors(res)
          }
          
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          "You Didn't accept the application",
          'error'
        )
      }
    })

    this.httpService.get(`application/${this.job_details.listing_id}/accept/${data.application_id}`)
      .subscribe(res => {
        if (res['responseCode'] === "00") {
        this.alertService.successAlerts(res['responseMessage'])
        } else { 
          this.alertService.errorAlerts("There was a problem excecuting the request")
      } 
  })
  }
  downloadFile(data: any) {
    this.httpService.get(`resource/get/${data.file.file_name}?download=1`)
    .subscribe(res => {

  })
  }
  openFile(data: any) {
    this.httpService.get(`resource/get/${data.file.file_name}?download=0`)
    .subscribe(res => {

  })
  }
  back() {
    this.router.navigate([`main/jobs/${this.job_details.listing_id}`])
  }


}
