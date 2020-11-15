import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";
import { SubSink } from "subsink";

@Component({
  selector: "app-add-interviewee",
  templateUrl: "./add-interviewee.component.html",
  styleUrls: ["./add-interviewee.component.scss"],
})
export class AddIntervieweeComponent implements OnInit {
  createFormGroup: FormGroup;
  interview_id: FormGroup;
  subs = new SubSink();
  users: any;
  url;
  msg = "";
  selectedFile: any;
  file: File;
  imageURL: string;
  constructor(
    private _fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<AddIntervieweeComponent>,
    @Inject(MAT_DIALOG_DATA) private dialog_data: any,
    private toastrService: ToasterAlertService
  ) {
    this.createFormGroup = _fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      middle_name: ["", Validators.required],
      phone_number: ["", Validators.required],
      email_address: ["", Validators.required],
      bio: ["", Validators.required],
      description: ["", Validators.required],
       profile_image: [null],
    });
  }
  selectedOption(user) {
    console.log(user);
  }
  public imagePath;
  imgURL: any;
  public message: string;
 
  // Image Preview
  showPreview(event) {
   this.selectedFile = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    
    this.createFormGroup.patchValue({
      avatar: this.selectedFile
    });
    this.createFormGroup.get('profile_image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile)
  }
  // selectFile(event: any) {
  //   this.selectFile = event.target.files[0]
  // }
  // uploadFile(event) {
  //   this.file = (event.target as HTMLInputElement).files[0];
  // }
  
  onSubmit(data: any) {
    let blob = new Blob([this.file]);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", this.selectedFile);
    console.log(formData);
    this.httpService
      .post(`interviewee/${this.dialog_data}/multipart`, formData)
      .subscribe((result) => {
        if (result["responseCode"] === "00") {
          this.toastrService.successAlerts(result["responseMessage"]);
          sessionStorage.setItem("interviewee", JSON.stringify(result));
          this.close();
        } else {
          alert("Something went wrong!");
        }
      });
  }
  loadUsers() {
    this.subs = this.httpService.get("users").subscribe((result) => {
      this.users = result.data;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
  uploadUsers() {
    alert("to be implemented!");
  }
 

  close() {
    this.dialogRef.close();
  }
  ngDestroy() {
    this.subs.unsubscribe();
  }
}
