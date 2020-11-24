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
  }
  loadJobListing(){
    this.httpService.get(`job/listing/${this.interview_id}`).subscribe(res=>{
      this.jobs = res['data']
      console.log(res);
      
    })
  }

}


