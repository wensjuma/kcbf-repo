import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { User } from 'src/app/common/models/users.model';
import { AuthService } from 'src/app/common/services/auth.service';
import { HttpService } from "src/app/common/services/http.service";
import { CreatePanelistDialogComponent } from "../create-panelist-dialog/create-panelist-dialog.component";

@Component({
  selector: "app-list-panelists",
  templateUrl: "./list-panelists.component.html",
  styleUrls: ["./list-panelists.component.scss"],
})
export class ListPanelistsComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "email",
  ];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  data: User;
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
          name: "editDialog",
          title:
            '<i class="fa fa-pencil-square fa-1x text-info"></i> &nbsp;&nbsp;',
        },
        {
          name: "viewrecord",
          title:
            ' &nbsp;<i class="fa fa-danger fa-1x fa-trash text-danger"></i>',
        },
        
        //  { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' }
        // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: "right",
    },
    delete: {
      deleteButtonContent:
        '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true,
    },
    rowClassFunction: (row) => {
     
      const authService = new AuthService(null, null, null)
      if(authService.currentUser.sub === 'm2@gmail.com'){
          return '';
      } else {
          return 'hide-action';
      }
    
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

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  constructor(private dialog: MatDialog, private httpService: HttpService, authService:AuthService) {}

  ngOnInit() {
    // this.data = ELEMENT_DATA
    this.loadPanelists();
  }
  loadPanelists() {
    this.httpService.get("users").subscribe((res) => {
      this.data = res["data"];
    });
  }
  openPanelistsDialog(_data, _mode: string) {
    console.log(_data);

    this.dialog.open(CreatePanelistDialogComponent, {
      data: {
        data: _data,
        mode: _mode,
      },
    });
  }
  onCustomAction(event: any) {
    switch (event.action) {
      case "editDialog":
        this.openPanelistsDialog(event.data, event.mode);
        break;
      default:
        break;
    }
  }
}

