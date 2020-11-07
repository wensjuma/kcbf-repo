import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-applicants',
  templateUrl: './list-applicants.component.html',
  styleUrls: ['./list-applicants.component.scss']
})
export class ListApplicantsComponent implements OnInit {
  public settings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        // { name: 'unpublish', title: '<i title="Unpublish this job" class="fa btn btn-warning btn-sm fa-1x fa-ban text-light"></i>' },
        { name: 'viewRecord', title: ' &nbsp;<i  title="view this job" class="fa btn-success btn-sm fa-danger fa-1x fa-eye text-light"></i>' }
        // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      index:{
        title: 'sr_no',
        type: 'text',
        filter: false,
        width: "30px",
        valuePrepareFunction: (value,row,cell) => {
          return cell.row.index + 1;
         }
      },   
      first_name: {
        title: 'Firstname',
        type: 'string',
        filter: false,
      },
      surname: {
        title: 'Surname',
        type: 'string',
        filter: false, 
        width: "100px",
      },
      applicant_residence: {
        title: 'Residence',
        type: 'string',
        filter: false, 
        width: "100px",    
      },
      email_address: {
        title: 'Email',
        type: 'string',
        filter: false,   
      },
      phone_number: {
        title: 'Phone',
        type: 'string',
        filter: false,
      },
      applied_on: {
        title: 'Date applied',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }, 
      },
      // accepted: false
      // applicant_residence: "nairobi"
      // application_id: 1335
      // applied_on: "2020-11-03T11:23:57.999"
      // email_address: "wensjuma@gmail.com"
      // expected_salary: 45000
      // first_name: "Wenslaus"
      // gender: "M"
      // id_number: "23456789"
      // job_id: 1176
      // middle_name: "Juma"
      // owner: "muriuki@gmail.com"
      // passport_number: "450000"
      // phone_number: "254740435363"
      // postal_address: "nairobi"
      // postal_code: "50012"
      // salutation: "Mr"
      // surname: "Juma"
      // upload: {file_n
      // job_type: {
      //   title: 'Type',
      //   type: 'string',
      //   filter: false
      // },
      // description: {
      //   title: 'Description',
      //   type: 'string',
      //   filter: false
      // },
     
    },
    attr:{
     class: 'table table-bordered table-striped'
    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  applicants: any;
  subs =new SubSink()
  job_id: any;
  job_details: any;

  constructor(
    private httpService: HttpService,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private router: Router
  ){
    this.job_id = this.activeRoute.snapshot.paramMap.get("id");
    // this.job_details = JSON.parse(sessionStorage.getItem("job_details"));
    this.job_details = JSON.parse(sessionStorage.getItem("jobdetails"));  
  }
  ngOnInit() {
    this.loadApplicants()
  }
  loadApplicants(){
    this.subs = this.httpService.get(`application/${this.job_id}/applications`).subscribe(res=>{
      this.applicants = res['data']
      console.log(this.applicants);  
     })
  }
  viewApplicant(data: any, event) {    
    console.log(data);
    
    this.router.navigate([`/main/jobs/new/${this.job_details.listing_id}/applicant/`, data.application_id])
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "viewRecord":
        this.viewApplicant(event.data, event.mode);
        break;
      default:
        break;
    }
  }

}
