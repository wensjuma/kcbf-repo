import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material';
import { EditJobDialogComponent } from './edit-job-dialog/edit-job-dialog.component';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
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
        { name: 'editRecord', title: ' &nbsp;<i  title="edit this job" class="fa btn-info btn-sm fa-danger fa-1x fa-pencil-square text-light"></i>' },
        { name: 'viewRecord', title: ' &nbsp;<i  title="view this job" class="fa btn-success btn-sm fa-danger fa-1x fa-eye text-light"></i>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      index: {
        title: 'sr_no',
        type: 'text',
        filter: false,
        width: "3 0px",
        valuePrepareFunction: (value, row, cell) => {
          value;
          row;
          return cell.row.index + 1;
        }
      },
      job_title: {
        title: 'Title',
        type: 'string',
        filter: false
      },
      job_field: {
        title: 'Field',
        type: 'string',
        filter: false,
        width: "100px"
      },
      published_on: {
        title: 'Published on',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      application_end_date: {
        title: 'Application end',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      description: {
        title: 'Description',
        type: 'string',
        filter: false,
        width: "150px"
      }
    },
    attr: {
      class: 'table table-bordered table-striped'
    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  jobs: any;
  subs = new SubSink()
  constructor(
    private httpService: HttpService,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.loadJobs()
  }
  loadJobs() {
    this.subs = this.httpService.get('job/listings').subscribe(res => {
      this.jobs = res['data'] ? res['data'].reverse() : []
    })
  }

  unPublishJob(data: any) {
    this.subs = this.httpService.patch(`job/unpublish/${data.listing_id}`)
      .subscribe(res => {
        this.jobs = res['data']
      })
  }
  viewRecord(data: any) {
    sessionStorage.setItem('jobdetails', JSON.stringify(data))
    this.router.navigate(['main/jobs', data.listing_id])
  }
  editJob(data: any, mode: string) {
    const dialogRef = this.dialog.open(EditJobDialogComponent, {
      width: '800px',
      data: {
        data: data,
        mode: mode
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      res = res;
      this.loadJobs()
    })
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "editRecord":
        this.editJob(event.data, event.mode);
        break;
      case "viewRecord":
        this.viewRecord(event.data);
        break;
      default:
        break;
    }
  }
}
