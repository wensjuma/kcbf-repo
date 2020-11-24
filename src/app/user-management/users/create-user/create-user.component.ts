import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';
import { UserTypes } from '../user-type';

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  title: string;
  user_type: { user_type_id: number; user_value: string; user_type: string; }[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private alertServce: ToasterAlertService
  ) {
    if (this.data.mode) {
      this.title = "Create users";
      this.form = _fb.group({
        firstname: ["", Validators.required],
        lastname: [ "", Validators.required],
        middlename: [ "", Validators.required],
        phonenumber: [ "", Validators.required],
        email: ["", Validators.required],
        bio: [ "" , Validators.required],
        academic_details: ["", Validators.required],
        user_type: [ "", Validators.required]
      });
    } else {
      this.title = "Edit user";
      this.form = _fb.group({
        firstname: [
           this.data.data.first_name,
          Validators.required,
        ],
        lastname: [ this.data.data.last_name, Validators.required],
        middlename: [ this.data.data.middle_name, Validators.required],
        phonenumber: [ this.data.data.phone_number, Validators.required],
        email: [ this.data.data.email_address, Validators.required],
        bio: [ this.data.data.bio , Validators.required],
        academic_details: [ this.data.data.academic_details, Validators.required],
        user_type: [ this.data.data.accountType, Validators.required]
      });
    }
    this.user_type = UserTypes
  }
  onSubmit(formData) {
    formData;
    if (this.data.mode) {
    this.create()
    } else {
      this.edit()
    } 
  }
  create() {
    const model = {
      email_address: this.form.value.email,
      first_name: this.form.value.firstname,
      middle_name: this.form.value.middlename,
      last_name: this.form.value.lastname,
      phone_number: this.form.value.phonenumber,
      bio: this.form.value.bio,
      academic_details: this.form.value.academic_details,
      role_name: this.form.value.user_type
    };
    this.httpService.post("register", model).subscribe((res) => {
      if (res['responseCode'] === '00') { 
        this.alertServce.successAlerts(res['responseMessage'])
        this.close()
      }else{
        this.alertServce.handleErrors(res)
      }
    });
  }
  edit() {
    const model = {
      email_address: this.form.value.email,
      first_name: this.form.value.firstname,
      middle_name: this.form.value.middlename,
      last_name: this.form.value.lastname,
      phone_number: this.form.value.phonenumber,
      bio: this.form.value.bio,
      academic_details: this.form.value.academic_details,
      role_name: this.form.value.user_type
    };
    this.httpService.put("register", model).subscribe((res) => {
      if (res['responseCode'] === '00') { 
        this.alertServce.successAlerts(res['responseMessage'])
        this.close()
      }else{
        this.alertServce.handleErrors(res)
      }
    });
  }
  ngOnInit() {}
  close(){
    this.dialogRef.close()
  }
}
