import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Interview } from 'src/app/common/models/interview.model';
import { AuthService } from 'src/app/common/services/auth.service';
import { HttpService } from 'src/app/common/services/http.service';
import { InterviewDetailsComponent } from 'src/app/interviews/create-interview/interview-components/interview-details/interview-details.component';
import { CreateInterviewInJobComponent } from './create-interview-in-job/create-interview-in-job.component';

@Component({
  selector: 'app-interview-in-job',
  templateUrl: './interview-in-job.component.html',
  styleUrls: ['./interview-in-job.component.scss']
})
export class InterviewInJobComponent implements OnInit {

  interviews: Interview[] = [];
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
            '<span class="btn btn-sm btn-info"><i class="fa fa-pencil-square"></i></span>&nbsp;'
        },
        {
          name: "viewrecord",
          title:
            '&nbsp;<span class="btn btn-sm btn-success">More</span>'
        }
      ],
      position: "right"
    },
    delete: {
      deleteButtonContent:
        '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: "No data found",
    columns: {
      // index: {
      //   title: "sr_no",
      //   type: "text",
      //   filter: false,
      //   width: "60px",
      //   valuePrepareFunction: (value, row, cell) => {
      //     value = value; row= row
      //     return cell.row.index + 1;
      //   }
      // },
      interview_name: {
        title: "Interview",
        type: "string",
        filter: false,
        width: "140px"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        width: "140px"
      },
      location_name: {
        title: "Room",
        type: "string",
        filter: false,
        width: "140px"
      },
      // location_code: {
      //   title: "Room code",
      //   type: "string",
      //   filter: false,
      //   width: "110px"
      // },
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
        }
      }
    },
    attr: {
      class: "table table-bordered table-striped"
    },
    pager: {
      display: true,
      perPage: 50
    }
  };
  get_interview: any;
  jobId: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute
  ) {
    this.jobId = this.activeRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    // if (this.authService.currentUser.sub === "m2@gmail.com") {
      this.loadInterviews();
  }
  loadInterviews() {
  
    this.httpService.get(`job/listing/${this.jobId}/interviews?page=0&size=50`)
      .subscribe((result) => {
      this.interviews = result["data"]; //? result["data"].reverse():'';
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
    
  }
  getInterviewById() {
   
  }
  viewMore(data: any) {
    this.httpService.get(`interview/${data.interview_id}`).subscribe((result) => {
      this.get_interview = result["data"];
      sessionStorage.setItem("interview_job", JSON.stringify(this.get_interview));
   });
    sessionStorage.setItem("interview_more", JSON.stringify(data));
    this.router.navigate(["main/interviews/interview", data.interview_id]);
  }
  createInterview(data: any, mode: string) {
    const dialogRef = this.dialog.open(CreateInterviewInJobComponent, {
      data: {
        data: data,
        job: this.jobId,
        mode: mode
      },
      width: "600px"
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
