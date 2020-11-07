import { Component, Inject, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { User } from "src/app/common/models/users.model";
import { HttpService } from "src/app/common/services/http.service";
import { SubSink } from "subsink";

@Component({
  selector: "app-assign-panelist",
  templateUrl: "./assign-panelist.component.html",
  styleUrls: ["./assign-panelist.component.css"],
})
export class AssignPanelistComponent implements OnInit {
  users: User;
  subs = new SubSink();
  form: FormGroup;
  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _fb: FormBuilder,
  //  private toastrService: ToastrService,
    private dialogRef: MatDialogRef<AssignPanelistComponent>,
    
  ) {
    this.form = this._fb.group({
      user: ["", Validators.required],
      panel_role: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.loadUsers();
    console.log(this._data);
    
  }
  loadUsers() {
    this.subs = this.httpService.get("users").subscribe((result) => {
      this.users = result.data;
    
    });
  }
  onSubmit(formData) {
    const model = {
      user_id: Number(this.form.value.user),
      panel_role: this.form.value.panel_role,
      description: this.form.value.description,
    };
    
    
    this.subs = this.httpService
      .post(`interviewer/${this._data.data.interview_id}`, model)
      .subscribe((result) => {
        // console.log(result);
        
        if(result['responseCode'] === '00'){
          // this.toastrService.success('Interviewer added', 'Success')
          this.close()
        }
        
      });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  close(){
    this.dialogRef.close()
  }
}
