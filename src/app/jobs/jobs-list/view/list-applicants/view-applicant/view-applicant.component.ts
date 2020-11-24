import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../common/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterAlertService } from '../../../../../common/services/toaster-alert.service';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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
  applicant_info: any;
  newWindow: Window;
  apprenticeships: any;
  businesses: any;
  documents: any;
  guardians: any;
  siblings: any;
  scholarships: any;

  constructor(
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private alertService: ToasterAlertService,
    private router: Router
   
  ) { 
    this.applicant_id = this.activeRoute.snapshot.paramMap.get("id");
    this.job_details = JSON.parse(sessionStorage.getItem("jobdetails"));  
    // this.applicant_info = JSON.parse(sessionStorage.getItem("applicant_info"));  
    console.log(this.applicant_info); 
  }
  ngOnInit() {
    this.loadApplicantInfo()
   
  }
  loadApplicantInfo() {
    this.httpService.get(`application/${this.applicant_id}/view/details`)
      .subscribe(res => {
         console.log(res);
        this.applicant_details = res['data']['application']
        this.apprenticeships = res['data']['apprenticeships']
        this.businesses = res['data']['businesses']
        this.uploaded_file = res['data']['documents']
        this.education_history = res['data']['education']
        this.works = res['data']['employments']
        this.guardians = res['data']['guardians']
        this.applicant_details = res['data']['application']
        this.siblings = res['data']['siblings']
        this.scholarships = res['data']['scholarships']
        
    //  this.applicant_details = res['data']   
    })
  }
  // loadApplicantWorkExperience() {
  //   this.httpService.get(`application/${this.applicant_id}/employment/history`)
  //     .subscribe(res => {
  //       this.works = res['data']       
  //   })
  // }
  // loadApplicantEducation() {
  //   this.httpService.get(`application/${this.applicant_id}/education/history`)
  //     .subscribe(res => {
  //       this.education_history = res['data']       
  //   })
  // }
  // loadApplicantDocuments() {
  //   this.httpService.get(`application/${this.applicant_id}/documents`)
  //     .subscribe(res => {
  //       this.uploaded_file = res['data']  
  //       console.log(this.uploaded_file);
        
  //   })
  // }
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
        this.httpService.get(`application/${this.job_details.listing_id}/accept/${data.application_id}`)
          .subscribe(res => {
          console.log(res);
          if (res['responseCode'] === "00") {
            Swal.fire(
                    'Accepted !',
                    'Application accepted',
                    'success'
            )
            this.loadApplicantInfo()
          } else { 
            this.alertService.errorAlerts("There was a problem excecuting the request")
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

  
  }
 rejectApplication(data: any) {
  
    Swal.fire({
      // title: 'Are you sure want to delete?',
      text: 'Sure to reject this application?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.httpService.get(`application/${this.job_details.listing_id}/reject/${data.application_id}`)
          .subscribe(res => {
        console.log(res);
        
          if (res['responseCode'] === "00") {
            Swal.fire(
                    'Rejected !',
                    'Application rejected',
                    'success'
            )
            this.loadApplicantInfo()
          } else { 
            this.alertService.errorAlerts("There was a problem excecuting the request")
        } 
    })
   
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          "You Didn't reject the application",
          'error'
        )
      }
    })

  
 }

  downloadFile(data: any,newWindow = this.newWindow) {
    console.log(data);  
    // window.location.href = data.file.file_name
    let fileData = data;
    // var blob = new Blob(fileData, { type: 'application/pdf' });
    // let url = window.URL.createObjectURL(blob);
    // console.log(url);
    // window.location.href = this.httpService.getFile(fileData)
    window.open(this.httpService.getFile(fileData))
    //newWindow.location = url; // open in new window
    // console.log(window.location.href);
  //   this.httpService.getResource(`resource/get/${data.file.file_name}?download=1`)
  //     .subscribe(res => {
  
      
  // })
  }
  openFile(data: any) {
    console.log(data);
    
    this.httpService.get(`resource/get/${data.file.file_name}?download=0`)
    .subscribe(res => {

  })
  }
  back() {
    this.router.navigate([`main/jobs/${this.job_details.listing_id}`])
  }


}
