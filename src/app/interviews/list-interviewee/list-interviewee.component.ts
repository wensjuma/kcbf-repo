import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';
import { CreatePanelistDialogComponent } from 'src/app/panelists/create-panelist-dialog/create-panelist-dialog.component';
import { IntervieweeDialogComponent } from './interviewee-dialog/interviewee-dialog.component';

@Component({
  selector: 'app-list-interviewee',
  templateUrl: './list-interviewee.component.html',
  styleUrls: ['./list-interviewee.component.scss']
})
export class ListIntervieweeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'email'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  data: PeriodicElement[];
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
      first_name: {
        title: 'First Name',
        type: 'string',
        filter: false,
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
        filter: false,
       
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private  dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.get('interviewee/list/38').subscribe(res =>{
     
      this.data = res['data']
    })
    // this.data = ELEMENT_DATA
  }
  openIntervieweesDialog(_data: any, _mode: string){
   this.dialog.open(IntervieweeDialogComponent,
    {
      width:'600px',
      data:{
        data: _data,
        mode: _mode
      }
    })
  }
  onCustomAction(event: any){
     
    switch(event.action){
      case 'editDialog':
        this.openIntervieweesDialog(event.data, event.mode)
        break;
        default:
          break;
    }
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  email: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', email: 'drog@gmail.com'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', email: 'drog@gmail.com'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', email: 'drog@gmail.com'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', email: 'drog@gmail.com'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', email: 'drog@gmail.com'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', email: 'drog@gmail.com'},
 

];
