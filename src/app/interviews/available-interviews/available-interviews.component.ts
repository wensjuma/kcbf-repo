import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Interview } from "src/app/common/models/interview.model";
import { AuthService } from "src/app/common/services/auth.service";
import { HttpService } from "src/app/common/services/http.service";
import { SubSink } from "subsink";
import { InterviewDetailsComponent } from "../create-interview/interview-components/interview-details/interview-details.component";

@Component({
  selector: "app-available-interviews",
  templateUrl: "./available-interviews.component.html",
  styleUrls: ["./available-interviews.component.css"],
})
export class AvailableInterviewsComponent implements OnInit {
  interviews: Interview[] = [];
  subs = new SubSink();
  interviewers: any;
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
          name: "editrecord",
          title:
            '<span class="btn btn-sm btn-info"><i class="fa fa-pencil-square"></i></span>&nbsp;',
        },
        {
          name: "viewrecord",
          title:
            '&nbsp;<span class="btn btn-sm btn-success">More Action</span>',
        },
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
      interview_name: {
        title: "Interview",
        type: "string",
        filter: false,
        width: "150px",
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        width: "170px",
      },
      location_name: {
        title: "Room",
        type: "string",
        filter: false,
        width: "140px",
      },
      location_code: {
        title: "Room code",
        type: "string",
        filter: false,
        width: "110px",
      },
      start_date: {
        title: "Date|Time",
        type: "string",
        filter: false,
        width: "170px",
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(
            raw,
            "dd MMM yyyy HH:mm:ss"
          );
          return formatted;
        },
      },
    },
    attr: {
      class: "table table-bordered table-striped",
    },
    pager: {
      display: true,
      perPage: 50,
    },
  };
  get_interview: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // if (this.authService.currentUser.sub === "m2@gmail.com") {
      this.loadInterviews();
  }
  loadInterviews() {
    this.httpService.get("interview?page=0&size=50").subscribe((result) => {
      this.interviews = result["data"]; //? result["data"].reverse():'';
      console.log(this.interviews);
      
    });
  }
  // loadPanelistInterviews() {
  //   //  interviewer/interviews
  //   this.httpService.get("interviewer/interviews").subscribe((result) => {
  //     // this.interviews = result["data"]; //? result["data"].reverse():'';
  //     console.log(this.interviews);
    
  //   });
  // }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  getInterviewById() {
   
  }
  viewMore(data: any) {
    console.log(data);
    
    this.httpService.get(`interview/${data.interview_id}`).subscribe((result) => {
      console.log(result);
      this.get_interview = result["data"];
      console.log(this.get_interview);
      sessionStorage.setItem("interview_job", JSON.stringify(this.get_interview));
   });
    sessionStorage.setItem("interview_more", JSON.stringify(data));
    this.router.navigate(["main/interviews/interview", data.interview_id]);
  }
  createInterview(data: any, mode: string) {
    const dialogRef = this.dialog.open(InterviewDetailsComponent, {
      data: {
        data: data,
        job: this.get_interview,
        mode: mode,
      },
      width: "700px",
      // disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadInterviews();
    });
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "viewrecord":
        this.viewMore(event.data);
        break;
      case "editrecord":
        this.createInterview(event.data, event.mode);
        break;
      default:
        break;
    }
  }
}
