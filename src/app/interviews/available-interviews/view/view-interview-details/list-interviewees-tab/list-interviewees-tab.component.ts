import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Interview } from "src/app/common/models/interview.model";
import { HttpService } from "src/app/common/services/http.service";
import { AddIntervieweeComponent } from "../add-interviewee/add-interviewee.component";
import { PanelistAwardsComponent } from './panelist-awards/panelist-awards.component';
@Component({
  selector: "app-list-interviewees-tab",
  templateUrl: "./list-interviewees-tab.component.html",
  styleUrls: ["./list-interviewees-tab.component.scss"],
})
export class ListIntervieweesTabComponent implements OnInit {
  interviews: any;
  interview_details: any;
  panelists: any;
  interviewees: Interview;
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
        // {
        //   name: "viewmoreResults",
        //   title:
        //     '<span><i title="View results break down" class="fa fa-eye btn btn-info btn-sm text-light"></i></span>',
        // },
        {
          name: "startInterview",
          title:
            '&nbsp;<i class="btn-start btn-sm fa-1x btn btn-success  text-light"> start</i>',
        },
      ],
      rowClassFunction:(row)=>{
        let complete = this.isInterviewComplete(row.data);
        if (complete){
            return 'interview-done';
        }else{
            return '';
        }
    },
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
  start_interview: any;
  intv_id: string;
  action_button: boolean;
  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
    this.loadPanelInterviewees();
    this.intv_id = this.activeRoute.snapshot.paramMap.get("id");
    // console.log(id);
    // this.isInterviewComplete()
  }
  isInterviewComplete(rowData){
    if(rowData.attended){
      return true
    }else{
      return false
    }
  }
  loadPanelInterviewees() {
    this.httpService
      .get(`interviewee/list/${this.interview_details.interview_id}`)
      .subscribe((result) => {
        console.log(result);
        this.interviewees = result["data"];
        result['data'].map(res=>{
          // console.log(res.attended);    
          if(res.attended ==null){
            this.action_button = false
          }else if(res.attended){
            this.action_button = true
          }
        })
      });
  }
  addInterviewee(data: any) {
    // console.log(data);
    const dialogRef = this.dialog.open(AddIntervieweeComponent, {
      data: this.intv_id,
      width: "600px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadPanelInterviewees();
    });
  }
  startInterview(data) {
    sessionStorage.setItem("startinterview_data", JSON.stringify(data));
    this.router.navigate(["main/interviews/pre"]);
  }
  viewMoreResults(data){
    this.dialog.open(PanelistAwardsComponent,{
      disableClose: true,
      data:data
    })
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "startInterview":
        this.startInterview(event.data);
        break;
      case "viewmoreResults":
        this.viewMoreResults(event.data);
        break;
      default:
        break;
    }
  }
}
