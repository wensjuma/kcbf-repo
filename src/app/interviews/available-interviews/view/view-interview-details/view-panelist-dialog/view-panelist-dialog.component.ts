import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { User } from "src/app/common/models/users.model";
import { HttpService } from "src/app/common/services/http.service";
@Component({
  selector: 'app-view-panelist-dialog',
  templateUrl: './view-panelist-dialog.component.html',
  styleUrls: ['./view-panelist-dialog.component.css']
})
export class ViewPanelistDialogComponent implements OnInit {
  details: any;

  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private dialogRef: MatDialogRef<ViewPanelistDialogComponent>,
  ) { }

  ngOnInit() {
    this.details = this._data
    console.log(this.details);
    
  }
  close(){
    this.dialogRef.close()
  }

}
