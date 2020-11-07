import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})
export class JobListingComponent implements OnInit {
  jobs: any;
  interview_id: any;

  constructor(private httpService: HttpService, private activeRoute: ActivatedRoute) { 
    this.interview_id = this.activeRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.jobs = jobs
    // this.loadJobListing()

  }
  loadJobListing(){
    this.httpService.get(`job/listing/${this.interview_id}`).subscribe(res=>{
      this.jobs = res['data']
      console.log(res);
      
    })
  }

}
export const jobs={
  "role": "manager",
  "category": null,
  "published": false,
  "description": "DDD",
  "qualifications": "Job requires ABCD",
  "listing_id": null,
  "application_end_date": "2020-10-25T14:30:00",
  "published_on": null,
  "min_salary": 200,
  "max_salary": 500,
  "category_id": 144,
  "job_field": "Accountant",
  "work_location": "Nairobi",
  "job_type": "FULL_TIME",
  "job_title": "Test"
}

