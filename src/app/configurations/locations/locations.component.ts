import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
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
            '<span title="Edit record" class="fa fa-edit fa-2x text-info"></span> &nbsp;&nbsp;&nbsp;',
        },
        {
          name: "removerecord",
          title:
            '<span title="Delete record" class="fa fa-trash fa-2x text-danger"></span>',
        }
       
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
      index:{
        title: "Ref.",
        type: "string",
        filter: false
      },
      location_code: {
        title: "Room code",
        type: "string",
        filter: false,
      },
      location_name: {
        title: "Room",
        type: "string",
        filter: false,
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,       
      }, 
    },
    attr: {
      class: "table table-bordered table-striped",
    },
    pager: {
      display: true,
      perPage:20,
    },
  };
  locations: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private alertservice: ToasterAlertService
  ) {}

  ngOnInit() {
    this.loadInterviewRooms();
  }
  loadInterviewRooms() {
    this.httpService.get("locations").subscribe((result) => {
      this.locations = result["data"];
      console.log(this.locations);
    });
  }
  loadInterviewers(myinterview) {
  }
editRecord(_data: any, mode: string){
  console.log(_data);
  
 const dialogRef = this.dialog.open(LocationDialogComponent,{
   width:'450px',
   data:{
     data:_data,
     mode: mode
   },
   disableClose: true
 })
  dialogRef.afterClosed().subscribe(res => {
    this.loadInterviewRooms()
  })
 
}
  remove(data: any) {
  
    Swal.fire({
      // title: 'Are you sure want to delete?',
      text: 'Are you sure want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.subs = this.httpService.delete(`location/${data.location_id}`).subscribe(res=>{
          if(res['responseCode']=== '00'){
            Swal.fire(
              'Deleted !',
              'Location has been deleted.',
              'success'
            )
           this.loadInterviewRooms()
          }else{
           this.alertservice.handleErrors(res)
          }
          
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })

}
ngOnDestroy(): void {
  this.subs.unsubscribe();
}
  onCustomAction(event: any){
     
    switch(event.action){
      case 'editrecord':
        this.editRecord(event.data, event.mode)
        break;
      case 'removerecord':
        this.remove(event.data)
        break;
        default:
          break;
    }
  }

}
