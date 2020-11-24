import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-add-new-quiz",
  templateUrl: "./add-new-quiz.component.html",
  styleUrls: ["./add-new-quiz.component.css"]
})
export class AddNewQuizComponent implements OnInit {
  form: FormGroup;
  quiz: string;
  title: string;
  step: any;
  exam_id: any;
  constructor(
    private dialogRef: MatDialogRef<AddNewQuizComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService,
    private activeRoute: ActivatedRoute
  ) {

    if (_data.mode) {
      this.title = "Add new question";
      this.form = this._fb.group({
        quiz_type: [ "", Validators.required],
        question: ["", Validators.required],
        description: ["", Validators.required],
        question_number: ["", Validators.required],
        max_score: ["", Validators.required]
      });
    } else {
      this.title = "Edit this question";
      this.form = this._fb.group({
        quiz_type: [_data.data.type_of_question, Validators.required],
        question: [_data.data.question, Validators.required],
        description: [_data.data.description, Validators.required],
        question_number: [  _data.data.question_number,Validators.required],
        max_score: [_data.data.max_score, Validators.required]
      });
    }
    this.step = JSON.parse(sessionStorage.getItem("step"));

  }
  ngOnInit() {
    // this.exam_id = this.activeRoute.snapshot.paramMap.get("id");
    // console.log(this.exam_id);
    console.log(this._data);
  }
  onSubmit() {

    if (this._data.mode) {
      this.createQuiz();
    } else {
      this.editQuiz();
    }
  }
  editQuiz() {

    const model = {
      type_of_question: this.form.value.quiz_type,
      question: this.form.value.question,
      description: this.form.value.description,
      question_number: this.form.value.quiz_number
    };
    this.httpService
      .put(
        `exam/${this._data.exam}/question/${this._data.data.questionId}`,
        model
      )
      .subscribe((res) => {
        console.log(res);
        if (res["responseCode"] === "00") {
          this.toastrService.successAlerts("Quiz edited, successfully");
          this.close();
        } else {
          this.toastrService.errorAlerts("Oohps!, something went wrong...");
        }
      });
  }
  createQuiz() {
    const model = {
      type_of_question: this.form.value.quiz_type,
      question: this.form.value.question,
      description: this.form.value.description,
      question_number: Number(this.form.value.quiz_number),
      max_score: Number(this.form.value.max_score)
    };
    this.httpService
      .post(`exam/${this._data.exam}/question`, model)
      .subscribe((res) => {
        console.log(res);
        if (res["responseCode"] === "00") {
          this.toastrService.successAlerts("Quiz added, successfully");
          this.close();
        } else {
          this.toastrService.errorAlerts("Oohps!, something went wrong...");
        }
      });
  }
  close() {
    this.dialogRef.close();
  }
}
