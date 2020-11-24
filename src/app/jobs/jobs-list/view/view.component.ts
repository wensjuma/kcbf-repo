import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { ToasterAlertService } from '../../../common/services/toaster-alert.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  job_details: any;
  subs = new SubSink()
  constructor(
    private httpService: HttpService,
    private alertService: ToasterAlertService
  ) {
    this.job_details = JSON.parse(sessionStorage.getItem('jobdetails'))
  }
  ngOnInit() {
  }
  publish(event: any): void {
    Swal.fire({
      text: 'Are you sure want to publish the job?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.subs = this.httpService.patch(`job/publish/${event.listing_id}`).subscribe(res => {
          if (res.responseCode === '00') {
            this.alertService.successAlerts(res.responseMessage)
            this.job_details.published = true
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Job not published',
          'error'
        )
      }
    })
  }
  unpublish(event: any): void {
    Swal.fire({
      text: 'Are you sure want to unpublish the job?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.subs = this.httpService.patch(`job/unpublish/${event.listing_id}`).subscribe(res => {
          if (res.responseCode === '00') {
            this.job_details.published = false
            this.alertService.successAlerts(res.responseMessage)
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Job is not unpublished',
          'error'
        )
      }
    })
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
