import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { AuthService } from "src/app/common/services/auth.service";
import { HttpService } from "src/app/common/services/http.service";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.css"],
})
export class ProfileViewComponent implements OnInit {
  email_address: string;
  phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  created_on: string;
  form: FormGroup;
  users: any;
  profile_info: any;
  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private httpService: HttpService
  ) {
    this.profile_info = JSON.parse(sessionStorage.getItem("profile_info"))[0];
    this.form = this._formBuilder.group({
      email_address: [this.profile_info ? this.profile_info.email_address : ""],
      phone_number: [this.profile_info ? this.profile_info.phone_number : ""],
      first_name: [this.profile_info ? this.profile_info.first_name : ""],
      middle_name: [this.profile_info ? this.profile_info.middle_name : ""],
      last_name: [this.profile_info ? this.profile_info.last_name : ""],
      created_on: [
        this.profile_info
          ? moment(this.profile_info.created_on).format("DD-MM-YYYY")
          : "",
      ],
    });

    console.log(this.profile_info);
  }
  onPersonEdit(evt){
    
  }

  ngOnInit() {}
  setFormValue() {
    console.log(this.profile_info);
  }
  url;
  msg = "";
  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = "You must select an image";
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    };
  }
}
