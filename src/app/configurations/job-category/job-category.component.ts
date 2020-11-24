import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CreateEditJobCatComponent } from './create-edit-job-cat/create-edit-job-cat.component';

@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.scss']
})
export class JobCategoryComponent implements OnInit {
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
            '<span title="Edit record" class="fa btn btn-sm btn-info fa-edit fa-1x text-light"></span> &nbsp;&nbsp;&nbsp;'
        },
        {
          name: "removerecord",
          title:
            '<span title="Delete record" class="fa btn btn-danger btn-sm fa-trash fa-1x text-light"></span>'
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
      index: {
        title: "sr_no",
        type: "text",
        filter: false,
        width: "60px",
        valuePrepareFunction: (value, row, cell) => {
          value;
          row;
          return cell.row.index + 1;
        }
      },
      category_name: {
        title: "Category name",
        type: "string",
        filter: true
      },
      
      description: {
        title: "Description",
        type: "string",
        filter: true      
      }  
    },
    attr: {
      class: "table table-bordered table-striped"
    },
    pager: {
      display: true,
      perPage: 20
    },
  };
  locations: any;
  category: any;
  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private alertservice: ToasterAlertService
  ) {}

  ngOnInit() {
    this.loadJobCategory();
  }
  loadJobCategory() {
    this.httpService.get("job/categories").subscribe((result) => {
      this.category = result["data"];
    });
  }
editRecord(_data: any, mode: string){
 const dialogRef = this.dialog.open(CreateEditJobCatComponent,{
   width:'450px',
   data:{
     data:_data,
     mode: mode
   },
   disableClose: true
 })
 dialogRef.afterClosed().subscribe(res=>{
   res =res
   this.loadJobCategory()
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
        this.subs = this.httpService.delete(`job/category/${data.category_id}`).subscribe(res=>{
  
          if(res['responseCode']=== '00'){
            Swal.fire(
              'Deleted !',
              'Category has been deleted.',
              'success'
            )
           this.loadJobCategory()
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
