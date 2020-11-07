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
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private router: Router,
    private dialogRef: MatDialogRef<LocationDialogComponent>,
    private alert: ToasterAlertService
  ) {
    this.form = this._fb.group({
        location_name: [_data.data?_data.data.location_name:'', Validators.required],
        description: [_data.data?_data.data.description:'', Validators.required],
        location_code: [_data.data?_data.data.location_code:'', Validators.required]
    })
    if(this._data.mode){
      this.title ="Create new room"
    }else{
      this.title ="Edit room details"
    }
   }
  ngOnInit() {
  }
  onSubmit(data: any) {
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
        console.log(result);
        if (result['responseCode'] === '00') {
          console.log(result);
          
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
      location_code: this.form.value.location_code,
   };
    console.log(model);
    
    this.loading = true
    this.httpService.put(`location/${this._data.data.location_id}`, model).subscribe((res) => {
      if (res["responseCode"] === "00") {
        console.log(res);
        
        this.alert.successAlerts(res["responseMessage"]);
        this.close()
      } else {
        this.alert.handleErrors(res);
      }
    }, (error) => error,
    );
  }
  close(){
  this.dialogRef.close()
  }
}
