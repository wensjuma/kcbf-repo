import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';
import { AssignPanelistComponent } from '../../../assign-panelist/assign-panelist.component';

@Component({
  selector: 'app-list-panelists-tab',
  templateUrl: './list-panelists-tab.component.html',
  styleUrls: ['./list-panelists-tab.component.css']
})
export class ListPanelistsTabComponent implements OnInit {
  panelists: any;
  interview_details: any;
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
        { name: 'editDialog', title: '<i title="remove panelist from interview" class="fa fa-ban btn btn-sm btn-danger fa-1x text-light"></i>' }
        // { name: 'startInterview', title: ' &nbsp;<i class="fa fa-danger fa-1x btn btn-danger  text-light"> start</i>' }
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
        width: "60px",
        valuePrepareFunction: (value, row, cell) => {
          value;
          row;
          return cell.row.index + 1;
         }
      },   
      first_name: {
        title: 'First Name',
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
  constructor(
    private dialog: MatDialog,
    private httpService:  HttpService
  ) { 
    this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
  }
  ngOnInit() {
    this.loadPanelists() 
  }
  addPanelist(interview) {
    const dialogRef = this.dialog.open(AssignPanelistComponent, {
      data: {
        data: interview
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      result= result
      this.loadPanelists();
    });
  }
  loadPanelists() {
    this.httpService
      .get(`interviewer/interview/${this.interview_details.interview_id}`)
      .subscribe((result) => {
        this.panelists = result["data"];
        console.log(this.panelists);
      });
  }
  onCustomAction(event) {  
    event;
  }
}
