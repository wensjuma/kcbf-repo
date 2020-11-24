import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';
import { AddExamDialogComponent } from './add-exam-dialog/add-exam-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-exams',
  templateUrl: './config-exams.component.html',
  styleUrls: ['./config-exams.component.scss']
})
export class ConfigExamsComponent implements OnInit {
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
          name: "editExam",
          title:
            '<i class="fa fa-pencil-square btn btn-sm btn-info fa-1x text-light"></i> &nbsp;&nbsp;'
        },
        {
          name: "viewExam",
          title:
            '<i title="View this exam" class="fa fa-eye btn btn-sm btn-success"></i>'
        }
        // { name: 'editQuiz', title: '<i class="fa  fa-pencil"></i>' }
      ],
      position: "right"
    },
    // rowClassFunction: (row) => {

    //  if (this.isQuizOpen(row.data)){
    //    return 'open-ended'  
    //  }
    // },
    noDataMessage: "No data found",
    columns: {
      index: {
        title: "Quiz no.",
        type: "text",
        filter: false,
        width: "40px",
        valuePrepareFunction: (value, row, cell) => {
          value;
          row;
          return cell.row.index + 1;
        }
      },
      exam_name: {
        title: "Exam",
        type: "string",
        filter: false,
        width: "300px"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        width: "500px"
      }
     
    },
    attr: {
      class: "table table-bordered table-striped"
    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  questions; //: Questions
  interview_id: any;
  dialogRef: any;
  step: any;
  open: boolean;
  exams: any;
  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.interview_id = JSON.parse(sessionStorage.getItem("interview_more"));
    this.step = JSON.parse(sessionStorage.getItem("step"));
    console.log(this.step)
  }
  ngOnInit() {
    this.loadExams();   
  }
  isQuizOpen(rowData){
    // console.log(rowData.type_of_question);
  if(rowData.type_of_question === "CLOSED"){
  return true
  }

  }
  loadExams() {
    this.httpService
      .get(`exam/list`)
      .subscribe((result) => {
        this.exams = result["data"];
        // console.log(this.questions);
      });
  }
  
  createExam(data: any, mode: string) {
    const dialogRef = this.dialog.open(AddExamDialogComponent, {
      width: "500px",
      data: {
        mode: mode,
        exam:data,
       
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      res = res;
      this.loadExams();
    });
  }
  viewExam(data: any) {
      this.router.navigate(['/main/exams', data.exam_id])
  }

  onCustomAction(event: any) {
    switch (event.action) {
      case "viewExam":
         this.viewExam(event.data);
        break;
      case "editExam":
        this.createExam(event.data, event.mode);
        break;
      default:
        break;
    }
  }

}
