import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { title } from 'process';

@Component({
  selector: 'app-create-panelist-dialog',
  templateUrl: './create-panelist-dialog.component.html',
  styleUrls: ['./create-panelist-dialog.component.scss']
})
export class CreatePanelistDialogComponent implements OnInit {
  title: string;
  createFormGroup: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private  data: any,
    private _fb: FormBuilder
  ) {
    console.log(data);
    
    this.createFormGroup = _fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      middlename: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required]
    })
    if(this.data.mode){
      this.title = "Create Panelist"
    } 
     else{
      this.title = "Edit Panelist"
    }
   }

  ngOnInit() {
   
    
  }

}
