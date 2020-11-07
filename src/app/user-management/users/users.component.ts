import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/common/models/users.model';
import { HttpService } from 'src/app/common/services/http.service';
import { LabelActiveComponent } from 'src/app/shared/components/label-active/label-active.component';
import { SubSink } from 'subsink';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  subs = new SubSink()
  users: User
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
    { name: 'editDialog', title: '<i class="fa fa-pencil-square fa-1x text-info"></i> &nbsp;&nbsp;' },
    { name: 'viewrecord', title: ' &nbsp;<i class="fa fa-danger fa-1x fa-trash text-danger"></i>' }
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
    private dialog: MatDialog,
    private httpService: HttpService,
    private datePipe: DatePipe
  ) {

   }
  ngOnInit() {
    this.loadUsers()
  }
  loadUsers() {
    this.subs = this.httpService.get("users").subscribe((result) => {
      this.users = result.data;
      console.log(this.users);
      
    });
  }
  createUserDialog(data: any, mode: string){
    const dialogRef= this.dialog.open(CreateUserComponent,{
       data:{
         data: data,
         mode:mode
       },
       width: '600px',
       disableClose: true
     })
     dialogRef.afterClosed().subscribe(res=>{
       this.loadUsers()
     })
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "editDialog":
        this.createUserDialog(event.data, event.mode);
        break;
      default:
        break;
    }
  }

}
