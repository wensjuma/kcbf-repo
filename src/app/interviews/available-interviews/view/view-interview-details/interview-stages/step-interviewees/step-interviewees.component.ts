import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-step-interviewees',
  templateUrl: './step-interviewees.component.html',
  styleUrls: ['./step-interviewees.component.scss']
})
export class StepIntervieweesComponent implements OnInit {
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
          name: "viewmoreResults",
          title:
            '<span><i title="View results break down" class="fa fa-eye btn btn-info btn-sm text-light"></i></span>',
        },
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
  interviewees: any;
  constructor(
    private dialogRef: MatDialogRef<StepIntervieweesComponent>,
    private httpService: HttpService,
    // private _fb: FormBuilder,
    // private alertService: ToasterAlertService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit() {
    console.log(this._data);
    this.loadStageInterviewee()
    
  }
  isInterviewComplete(rowData){
   if(rowData.attended){
     return true
   }
  }
  loadStageInterviewee() {

    this.httpService
      .get(`interviewee/list/${this._data.step_id}`)
      .subscribe((result) => {
        // console.log(result);
        this.interviewees = result["data"];
      });
  }
  onCustomAction(event){

  }
}
