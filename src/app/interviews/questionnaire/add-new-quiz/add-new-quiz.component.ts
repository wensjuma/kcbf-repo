import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "src/app/common/services/http.service";
import { ToasterAlertService } from "src/app/common/services/toaster-alert.service";

@Component({
  selector: "app-add-new-quiz",
  templateUrl: "./add-new-quiz.component.html",
  styleUrls: ["./add-new-quiz.component.css"],
})
export class AddNewQuizComponent implements OnInit {
  form: FormGroup;
  quiz: string;
  title: string;
  step: any;
  constructor(
    private dialogRef: MatDialogRef<AddNewQuizComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService
  ) {
    this.form = this._fb.group({
      quiz_type: [
        _data.data ? _data.data.type_of_question : "",
        Validators.required,
      ],
      question: [_data.data ? _data.data.question : "", Validators.required],
      description: [
        _data.data ? _data.data.description : "",
        Validators.required,
      ],
      question_number: [
        _data.data ? _data.data.question_number : "",
        Validators.required,
      ],
      max_score: [_data.data ? _data.data.max_score : "", Validators.required],
    });
    if (_data.mode) {
      this.title = "Add new question";
    } else {
      this.title = "Edit this question";
    }
    this.step =JSON.parse(sessionStorage.getItem("step"));
    
  }
  ngOnInit() {
    console.log(this._data);
  }
  onSubmit() {
    // console.log(this._data.mode);  
    if (this._data.mode) {
      this.createQuiz();
    } else {
      this.editQuiz();
    }
    
  
    
  }
  editQuiz() {
    console.log(1234);
    
    const model = {
      type_of_question: this.form.value.quiz_type,
      question: this.form.value.question,
      description: this.form.value.description,
      question_number: this.form.value.quiz_number,
    };
    this.httpService
      .put(
        `questions/${this.step.step_id}/interview/${this._data.data.questionId}`,
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
      max_score: Number(this.form.value.max_score),
    };
    this.httpService
      .post(`questions/${this.step.step_id}/interview`, model)
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
