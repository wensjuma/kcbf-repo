import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from '../../../common/services/toaster-alert.service';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {
  form: FormGroup
  title: string;
  loading: boolean;
  constructor(
    private httpService: HttpService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private dialogRef: MatDialogRef<LocationDialogComponent>,
    private alert: ToasterAlertService
  ) {
   
    if(this._data.mode){
      this.title = "Create new room"
      this.form = this._fb.group({
        location_name: ["", Validators.required],
        description: ["", Validators.required],
        location_code: ["", Validators.required]
    })
    }else{
      this.title = "Edit room details";
      this.form = this._fb.group({
        location_name: [_data.data.location_name, Validators.required],
        description: [_data.data.description, Validators.required],
        location_code: [_data.data.location_code, Validators.required]
    })
    }
   }
  ngOnInit() {
  }
  onSubmit(data: any) {
    data;
    if (this._data.mode) { 
      this.create()
    } else {
      this.edit()
    }
  }
  create(){
      const model= {
          "location_name":this.form.value.location_name,
          "description": this.form.value.description,
          "location_code": this.form.value.location_code
      }
      this.httpService.post('location', model).subscribe(result=>{
        if (result['responseCode'] === '00') {
          this.alert.successAlerts(result['responseMessage'])
          // this.router.navigate(['main/create-interview/interview-details'])
          this.close()
        } else{
          this.alert.errorAlerts('Something went wrong!')
        }  
      })
  }
  edit() {  
   const model = {
      description: this.form.value.description,
      location_name: this.form.value.location_name,
      location_code: this.form.value.location_code
   };
    this.loading = true
    this.httpService.put(`location/${this._data.data.location_id}`, model).subscribe((res) => {
      if (res["responseCode"] === "00") {
        this.alert.successAlerts(res["responseMessage"]);
        this.close()
      } else {
        this.alert.handleErrors(res);
      }
    }, (error) => error
    );
  }
  close(){
  this.dialogRef.close()
  }
}
