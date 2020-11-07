import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";
import { SubSink } from "subsink";
import Swal from "sweetalert2";
import { AddEditStageComponent } from "./add-edit-stage/add-edit-stage.component";
import { StepIntervieweesComponent } from "./step-interviewees/step-interviewees.component";

@Component({
  selector: "app-interview-stages",
  templateUrl: "./interview-stages.component.html",
  styleUrls: ["./interview-stages.component.scss"],
})
export class InterviewStagesComponent implements OnInit {
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
          name: "viewRecord",
          title:
            '<i title="Manage questions in stage" class="fa fa-eye btn btn-sm btn-success fa-1x text-light"> questions</i> &nbsp;&nbsp;',
        },
        {
          name: "editRecord",
          title:
            '<i title="Edit interview stage" class="fa fa-pencil-square btn btn-sm btn-info fa-1x text-light"></i>',
        },
        {
          name: "deleteRecord",
          title:
            ' &nbsp;<i class="fa fa-trash fa-1x btn btn-sm btn-danger  text-light"></i>',
        },
        // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
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
      stage_name: {
        title: "Stage Name",
        type: "string",
        filter: false,
        
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        width: "260px"
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
  stages: any;
  interview_id: any;
  subs = new SubSink();
  interview_details: any;
  constructor(
    private dialog: MatDialog,
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private alertservice: ToasterAlertService,
    private router: Router
  ) {
    this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
    // console.log(this.interview_details);
    this.interview_id = this.activeRoute.snapshot.paramMap.get("id");
  }
  ngOnInit() {
    this.loadStages();
  }
  addStage(stage: any, mode: string) {
    //  sessionStorage.setItem('current_interview_id', JSON.stringify(this.interview_id))
    const dialogRef = this.dialog.open(AddEditStageComponent, {
      data: {
        data: stage,
        interview: this.interview_id,
        mode: mode
      },

      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadStages();
    });
  }
  loadStages() {
    this.httpService
      .get(`interview/${this.interview_id}/stages`)
      .subscribe((result) => {
        this.stages = result["data"];
        console.log(this.stages);
      });
  }

  editRecord(_data: any, mode: string) {
    const dialogRef = this.dialog.open(AddEditStageComponent, {
      width: "450px",
      data: {
        data: _data,
        mode: mode,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      res = res;
      this.loadStages();
    });
  }
  remove(data: any) {
    console.log(data);

    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.subs = this.httpService
          .delete(
            `interview/${this.interview_details.interview_id}/stage/${data.step_id}`
          )
          .subscribe((res) => {
            if (res["responseCode"] === "00") {
              //  this.alertservice.successAlerts('Deleted Successfuly')
              Swal.fire("Deleted!", "Your record has been deleted.", "success");
              this.loadStages();
            } else {
              this.alertservice.handleErrors(res);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your record is safe :)", "error");
      }
    });
  }
  viewStageQuestions(data: any) {
    sessionStorage.setItem('step', JSON.stringify(data))
    this.router.navigate(['main/interviews/questionnaire'], {state: {data: data}})   
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "editRecord":
        this.editRecord(event.data, event.mode);
        break;
      case "deleteRecord":
        this.remove(event.data);
        break;
      case "viewRecord":
        this.viewStageQuestions(event.data);
        break;
      default:
        break;
    }
  }
  ngAfterViewInit() { }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
