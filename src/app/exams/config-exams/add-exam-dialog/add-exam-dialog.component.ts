import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';

@Component({
  selector: 'app-add-exam-dialog',
  templateUrl: './add-exam-dialog.component.html',
  styleUrls: ['./add-exam-dialog.component.scss']
})
export class AddExamDialogComponent implements OnInit {
  form: FormGroup
  title: string;
  loading: boolean;
  constructor(
    private httpService: HttpService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private router: Router,
    private dialogRef: MatDialogRef<AddExamDialogComponent>,
    private alert: ToasterAlertService
  ) {
    this.form = this._fb.group({
      exam_name: [_data.data?_data.data.exam_name:'', Validators.required],
        description: [_data.data?_data.data.description:'', Validators.required]
       
    })
    if(this._data.mode){
      this.title ="Create Exam"
    }else{
      this.title ="Edit Exam"
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
          "exam_name":this.form.value.exam_name,
          "description": this.form.value.description, 
      }
      this.httpService.post('exam/add', model).subscribe(result=>{
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
      exam_name: this.form.value.exam_name, 
   };
    this.loading = true
    this.httpService.put(`exam/${this._data.exam_id}`, model).subscribe((res) => {
      if (res["responseCode"] === "00") {
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
