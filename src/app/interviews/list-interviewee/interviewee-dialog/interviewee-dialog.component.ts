import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-interviewee-dialog',
  templateUrl: './interviewee-dialog.component.html',
  styleUrls: ['./interviewee-dialog.component.scss']
})
export class IntervieweeDialogComponent implements OnInit {

  title: string;
  createFormGroup: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private  data: any,
    private _fb: FormBuilder,
    private httpService: HttpService
  ) {
    console.log(data);
    
    this.createFormGroup = _fb.group({
      firstname: [this.data.data? this.data.data.name:'', Validators.required],
      lastname: ['', Validators.required],
      middlename: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      bio: ['', Validators.required],
      description: ['', Validators.required],
    })
    if(this.data.mode){
      this.title = "Create Interviewees"
    } 
     else{
      this.title = "Edit Interviewees"
    }
   }

   createInterviewee(){
     const model ={
      "first_name": this.createFormGroup.value.firstname,
      "middle_name": this.createFormGroup.value.middlename,
      "last_name": this.createFormGroup.value.lastname,
      "email_address":this.createFormGroup.value.email,
      "phone_number": this.createFormGroup.value.phonenumber,
      "bio": this.createFormGroup.value.bio,
      "description": this.createFormGroup.value.description
  }
  console.log(model);
  
  this.httpService.post('interviewee/38', model).subscribe(res=>{
    console.log(res)  
  })
   }


  ngOnInit() {
  }

}
