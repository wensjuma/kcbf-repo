import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";
import { CreateEditJobCatComponent } from "src/app/configurations/job-category/create-edit-job-cat/create-edit-job-cat.component";

@Component({
  selector: "app-add-edit-stage",
  templateUrl: "./add-edit-stage.component.html",
  styleUrls: ["./add-edit-stage.component.scss"],
})
export class AddEditStageComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  title: string;
  interview_id: any;
  exams: any;
  constructor(
    private dialogRef: MatDialogRef<CreateEditJobCatComponent>,
    private httpService: HttpService,
    private _fb: FormBuilder,
    private alertService: ToasterAlertService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.form = this._fb.group({
      description: [
        this._data.data ? this._data.data.description : null,
        Validators.required,
      ],
      is_stage_last: [
        this._data.data ? this._data.data.is_last : null,
        Validators.required,
      ],
      exam_id: [
        this._data.data ? this._data.data.exam_name : null,
        Validators.required,
      ],
      stage_name: [
        this._data.data ? this._data.data.stage_name : null,
        Validators.required,
      ],
    });
 
    if (_data.mode) {
      this.title = "Create Interview stage";
    } else {
      this.title = "Edit Interview stage "; //+ this._data.data.stage_name
    }
  
   
  }
  ngOnInit() {
    this.interview_id =JSON.parse(sessionStorage.getItem('interview_more')).interview_id
   this.loadExams()
  }
  loadExams() {
    // exam/list
    this.httpService
    .get(`exam/list`)
    .subscribe(
      (res) => {
       this.exams = res['data']
      },
      (error) => error
    );
  }
  onSubmit(formData: any) {
    if (!this._data.mode) {
      this.editStage();
    } else {
      const model = {
        description: this.form.value.description,
        is_last: this.form.value.is_stage_last,
        exam_id: this.form.value.exam_id,
        stage_name: this.form.value.stage_name,
      };

      this.loading = true;
      this.httpService
        .post(`interview/${this._data.interview}/stage/add`, model)
        .subscribe(
          (res) => {
            if (res["responseCode"] === "00") {
              this.alertService.successAlerts(res["responseMessage"]);
              this.close();
            } else {
              this.alertService.handleErrors(res);
            }
          },
          (error) => error
        );
    }
  }
  editStage() {
    const model = {
      description: this.form.value.description,
      is_last: this.form.value.is_stage_last,
      exam_id: this.form.value.exam_id,
      stage_name: this.form.value.stage_name,
    };

    this.loading = true;
    this.httpService
      .put(
        `interview/${this.interview_id}/stage/${this._data.data.step_id}`,
        model
      )
      .subscribe(
        (res) => {
          if (res["responseCode"] === "00") {
            this.alertService.successAlerts(res["responseMessage"]);
            this.close();
          } else {
            this.alertService.handleErrors(res);
          }
        },
        (error) => error
      );
  }
  close() {
    this.dialogRef.close();
  }
}
