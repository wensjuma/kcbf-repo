import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-list-my-interviews',
  templateUrl: './list-my-interviews.component.html',
  styleUrls: ['./list-my-interviews.component.scss']
})
export class ListMyInterviewsComponent implements OnInit {
  interviews: any;
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
        width: "200px",
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
            "dd MMM yyyy HH:mm"
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
      perPage: 20,
    },
  };
  constructor(
    private httpService: HttpService,
    private datePipe: DatePipe,
    private router:Router
  ) { }

  ngOnInit() {
    this.loadPanelistInterviews()
  }
   loadPanelistInterviews() {
   
    this.httpService.get("interviewer/interviews").subscribe((result) => {
      this.interviews = result["data"]; //? result["data"].reverse():'';
      console.log(this.interviews);
    
    });
  }
  viewMore(data: any) {
    // console.log(data);    
    sessionStorage.setItem("interview_more", JSON.stringify(data));
    this.router.navigate(["main/myinterviews", data.interview_id]);
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "viewrecord":
        this.viewMore(event.data);
        break;
      default:
        break;
    }
  }

}
