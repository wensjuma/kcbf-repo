import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { HttpService } from "src/app/common/services/http.service";
import { AssignPanelistComponent } from "../../assign-panelist/assign-panelist.component";
import { QuestionsDialogComponent } from '../questions-dialog/questions-dialog.component';
import { AddIntervieweeComponent } from './add-interviewee/add-interviewee.component';
import { ViewPanelistDialogComponent } from "./view-panelist-dialog/view-panelist-dialog.component";

@Component({
  selector: "app-view-interview-details",
  templateUrl: "./view-interview-details.component.html",
  styleUrls: ["./view-interview-details.component.scss"],
})
export class ViewInterviewDetailsComponent implements OnInit {
  interviews: any;
  interview_details: any;
  panelists: any;
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
        { name: 'editDialog', title: '<i class="fa fa-pencil-square fa-1x text-info"></i> &nbsp;&nbsp;' },
        { name: 'startInterview', title: ' &nbsp;<i class="fa fa-danger fa-1x btn btn-danger  text-light"> start</i>' }
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
      first_name: {
        title: 'first Name',
        type: 'string',
        filter: false
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
        filter: false
       
      },
      email_address: {
        title: 'Email',
        type: 'string',
        filter: false
      },
      phone_number: {
        title: 'Phonenumber',
        type: 'string',
        filter: false
      },
    },
    attr:{
     class: 'table table-bordered table-striped'
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  interviewees: any;
  constructor(
    private dialog: MatDialog,
   
  ) {
    this.interview_details = JSON.parse(sessionStorage.getItem('interview_more'))
  }

  ngOnInit() {
    
    // console.log(this.interview_details);
    // this.loadPanelists();
    // this.loadPaneInterviewee()
  }
 
  // openQuestions(interview) {
  //   this.router.navigate(['main/interviews/questionnaire'])   
  // }
  viewPanelist(_data: any) {
    const dialogRef = this.dialog.open(ViewPanelistDialogComponent, {
      width:'400px',
      data: {
        data: _data
      },
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      res = res;
    })
  }

 
  start_interview(start_interview: any) {
   start_interview= start_interview
  }
  onCustomAction(event: any){
     
    switch(event.action){
      case 'startInterview':
        // this.startInterview(event.data)
        break;
        default:
          break;
    }
  }
 
}
