import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "src/app/common/services/http.service";

@Component({
  selector: "app-panelist-awards",
  templateUrl: "./panelist-awards.component.html",
  styleUrls: ["./panelist-awards.component.scss"]
})
export class PanelistAwardsComponent implements OnInit {
  interviewee: string;
  panelist_award: any;
  interview_first_name: "test"
  interview_id: 136
  interview_middle_name: "test"
  interview_name: "Test interview 1"
  interview_score: 0
  maxScore: null
  percentageScore: null
  recommendation: "end interview"
  public settings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
     
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
      interview_name: {
        title: 'Interview',
        type: 'string',
        filter: false
      },
      interview_first_name: {
        title: 'Panelist first Name',
        type: 'string',
        filter: false
      },
      interview_middle_name: {
        title: 'Middle name',
        type: 'string',
        filter: false
       
      },
      interview_score: {
        title: 'Score awarded',
        type: 'string',
        filter: false
      },
      percentageScore: {
        title: 'Percentage',
        type: 'string',
        filter: false
      },
      recommendation: {
        title: 'Recommendattion',
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
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private dialogRef: MatDialogRef<PanelistAwardsComponent>
  ) {}

  ngOnInit() {
    
    this.loadPanelistAwards();
  }
  loadPanelistAwards() {
    this.httpService
      .get(`interviewee/${this._data.intervieweeId}/results`)
      .subscribe((result) => {
        // console.log(result);
        
        this.panelist_award = result["data"];
        // console.log(this.panelist_award);
        
      });
  }
  close() {
    this.dialogRef.close();
  }
  onCustomAction(event: any){
    event;
}
}

