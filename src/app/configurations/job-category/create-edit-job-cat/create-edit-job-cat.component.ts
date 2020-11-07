import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { title } from 'process';
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";

@Component({
  selector: "app-create-edit-job-cat",
  templateUrl: "./create-edit-job-cat.component.html",
  styleUrls: ["./create-edit-job-cat.component.scss"],
})
export class CreateEditJobCatComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  title: string;
  constructor(
    private dialogRef: MatDialogRef<CreateEditJobCatComponent>,
    private httpService: HttpService,
    private _fb: FormBuilder,
    private alertService: ToasterAlertService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.form = this._fb.group({
      description: [this._data ? this._data.data.description : null, Validators.required],
      category_name: [this._data ? this._data.data.category_name : null, Validators.required],
    });
    if (_data.mode) {
      this.title = 'Create category'
    }
    else {
      this.title = 'Edit category'
    }
  }
  ngOnInit() { }
  onSubmit(formData: any) {
    if (this._data.mode) {
      this.create()
    } else {
      this.edit()
     }
  }
  create() {
    const model = {
      description: this.form.value.description,
      category_name: this.form.value.category_name,
    };
    console.log(model);

    this.loading = true
    this.httpService.post("job/category", model).subscribe((res) => {
      console.log(res);

      if (res["responseCode"] === "00") {
        this.alertService.successAlerts(res["responseMessage"]);
        this.close()
      } else {
        this.alertService.handleErrors(res);
      }
    }, (error) => error,
    );
  }
  edit() {
    const model = {
      description: this.form.value.description,
      category_name: this.form.value.category_name,
    };
    

    this.loading = true
    this.httpService.put(`job/category/${this._data.data.category_id}`, model).subscribe((res) => {
     

      if (res["responseCode"] === "00") {
        this.alertService.successAlerts(res["responseMessage"]);
        this.close()
      } else {
        this.alertService.handleErrors(res);
      }
    }, (error) => error,
    );
  }
  close() {
    this.dialogRef.close();
  }
}