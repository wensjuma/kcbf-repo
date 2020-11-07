import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../common/services/http.service';
import { SubSink } from 'subsink';
import { DatePipe } from '@angular/common';
import { LabelActiveComponent } from 'src/app/shared/components/label-active/label-active.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-users',
  templateUrl: './applicant-users.component.html',
  styleUrls: ['./applicant-users.component.scss']
})
export class ApplicantUsersComponent implements OnInit {
subs = new SubSink()
  users: any;
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
      //  { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' }
      // { name: 'editDialog', title: '<i class="fa fa-pencil-square fa-1x text-info"></i> &nbsp;&nbsp;' },
      { name: 'viewrecord', title: ' &nbsp;<i title="View applicant" class="fa btn btn-sm btn-default fa-eye fa-1x fa text-primary"></i>' }
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
        valuePrepareFunction: (value,row,cell) => {
          return cell.row.index + 1;
         }
      },
      email_address: {
        title: 'Email Address',
        type: 'string',
        filter: false
      },
      first_name: {
        title: 'First name',
        type: 'string',
        filter: false
      },
      last_name: {
        title: 'Last name',
        type: 'string',
        filter: false
      },
      phone_number: {
        title: 'Phone',
        type: 'string',
        filter: false
      },
      created_on: {
        title: 'Created On',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
      },
      account_status: {
        title: 'Status',
        type: 'custom',
        filter: false,
        renderComponent: LabelActiveComponent
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
    private httpService: HttpService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsers()
  }
  loadUsers() {
    this.subs = this.httpService.get("applicants").subscribe((result) => {
      this.users = result.data;
      console.log(this.users);
      
    });
  }
  viewApplicant(data: any, event) {
    console.log(data);
    
    // this.router.navigate(['applicant', data.])
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "viewrecord":
        this.viewApplicant(event.data, event.mode);
        break;
      default:
        break;
    }
  }
}
