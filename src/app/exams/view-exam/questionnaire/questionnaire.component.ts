import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { map } from "rxjs/operators";
import { HttpService } from "src/app/common/services/http.service";
import { AddNewQuizComponent } from "../../add-new-quiz/add-new-quiz.component";
import { AddQuizOptionComponent } from "../../add-quiz-option/add-quiz-option.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-questionnaire",
  templateUrl: "./questionnaire.component.html",
  styleUrls: ["./questionnaire.component.scss"],
})
export class QuestionnaireComponent implements OnInit {
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
          name: "editQuiz",
          title:
            '<i class="fa fa-pencil-square btn btn-sm btn-info fa-1x text-light"></i> &nbsp;&nbsp;',
        },
        {
          name: "addOptions",
          title:
            '<i title="Create options for this question" class="fa btn btn-sm btn-success">options</i>',
        },
        // { name: 'editQuiz', title: '<i class="fa  fa-pencil"></i>' }
      ],
      position: "right",
    },
    rowClassFunction: (row) => {

     if (this.isQuizOpen(row.data)){
       return 'open-ended'  
     }
    },
    noDataMessage: "No data found",
    columns: {
      index: {
        title: "Quiz no.",
        type: "text",
        filter: false,
        width: "40px",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      },
      question: {
        title: "Question",
        type: "string",
        filter: false,
        width: "500px"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        width: "70px",
      },
      max_score: {
        title: "MaxScore",
        type: "string",
        filter: false,
        width: "35px",
      },
      type_of_question: {
        title: "Quiz type",
        type: "string",
        filter: false,
        width: "30px",
      },
    },
    attr: {
      class: "table table-bordered table-striped",
    },
    pager: {
      display: true,
      perPage: 20,
    },
  };
  questions; //: Questions
  interview_id: any;
  dialogRef: any;
  step: any;
  open: boolean;
  exam_id: any;
  constructor(
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog) {
    this.interview_id = JSON.parse(sessionStorage.getItem("interview_more"));
    this.step = JSON.parse(sessionStorage.getItem("step"));
    this.exam_id = this.activeRoute.snapshot.paramMap.get("id");
  }
  ngOnInit() {
    this.loadQuestions();   
  }
  isQuizOpen(rowData){
    // console.log(rowData.type_of_question);
  if(rowData.type_of_question === "CLOSED"){
  return true
  }

  }
  loadQuestions() {
    this.httpService
      .get(`exam/${this.exam_id}/questions`)
      .subscribe((result) => {
        this.questions = result["data"];
        console.log(this.questions);
      });
  }
  openOptionsDialog(_data: any) {
    const dialogRef = this.dialog.open(AddQuizOptionComponent, {
      width: "500px",
      data: {
        data: _data,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadQuestions();
    });
  }
  createQuestions(data: any, mode: string) {
  
    const dialogRef = this.dialog.open(AddNewQuizComponent, {
      width: "500px",
      data: {
       
        mode: mode,
        data:data,
        exam: this.exam_id 
      },
      
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadQuestions();
    });
  }
  editQuiz(_data: any, mode: string) {
    const dialogRef = this.dialog.open(AddNewQuizComponent, {
      data: {
        data: _data,
        mode: mode,
      },
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadQuestions();
    });
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "addOptions":
        this.openOptionsDialog(event.data);
        break;
      case "editQuiz":
        this.createQuestions(event.data, event.mode);
        break;
      default:
        break;
    }
  }
}
