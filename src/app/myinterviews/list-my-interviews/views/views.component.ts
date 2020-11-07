import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  interview_details: any;
  interviewees: any;
  public settings = {
    selectMode: "single", // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: "Actions",
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: "startInterview",
          title:
            '&nbsp;<i class="btn-start btn-sm fa-1x btn btn-success  text-light"> start</i>',
        },
      ],
    //   rowClassFunction:(row)=>{
    //     let complete = this.isInterviewComplete(row.data);
    //     if (complete){
    //         return 'interview-done';
    //     }else{
    //         return '';
    //     }
    // },
      position: "right",
    },
    delete: {
      deleteButtonContent:
        '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true,
    },
    noDataMessage: "No data found",
    columns: {
      index: {
        title: "sr_no",
        type: "text",
        filter: false,
        width: "60px",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      },
      first_name: {
        title: "First Name",
        type: "string",
        filter: false,
      },
      last_name: {
        title: "Last Name",
        type: "string",
        filter: false,
      },
      email_address: {
        title: "Email",
        type: "string",
        filter: false,
      },
      phone_number: {
        title: "Phonenumber",
        type: "string",
        filter: false,
      },

    },
    attr: {
      class: "table table-bordered table-striped",
    },
    pager: {
      display: true,
      perPage: 10,
    },
  };
  constructor(
    private httpService: HttpService,
    private router: Router
  ) {
    this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
   }

  ngOnInit() {
    this.loadPanelInterviewees()
  }
  loadPanelInterviewees() {
    this.httpService
      .get(`interviewee/list/${this.interview_details.interview_id}`)
      .subscribe((result) => {
        console.log(result);
        this.interviewees = result["data"];
        result['data'].map(res=>{
          // console.log(res.attended);    
          // if(res.attended ==null){
          //   this.action_button = false
          // }else if(res.attended){
          //   this.action_button = true
          // }
        })
      });
  }
  startInterview(data) {
    sessionStorage.setItem("startinterview_data", JSON.stringify(data));
    this.router.navigate(["main/interviews/pre"]);
  }
  // viewMoreResults(data){
  //   this.dialog.open(PanelistAwardsComponent,{
  //     disableClose: true,
  //     data:data
  //   })
  // }
  onCustomAction(event: any) {
    switch (event.action) {
      case "startInterview":
        this.startInterview(event.data);
        break;
     
      default:
        break;
    }
  }

}
