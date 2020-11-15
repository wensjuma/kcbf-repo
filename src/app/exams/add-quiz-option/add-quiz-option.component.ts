import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';
import { EditOptionsDialogComponent } from './edit-options-dialog/edit-options-dialog.component';

@Component({
  selector: 'app-add-quiz-option',
  templateUrl: './add-quiz-option.component.html',
  styleUrls: ['./add-quiz-option.component.css']
})
export class AddQuizOptionComponent implements OnInit {
  form: FormGroup;
 
  constructor(
    private dialogRef: MatDialogRef<AddQuizOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public quiz: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService,
    private dialog: MatDialog
  ) {

    this.form = this._fb.group({
      
      option_text: ['', Validators.required],
      order: ['', Validators.required],
      score: ['', Validators.required],
    })  
}
ngOnInit() {
  
}
onSubmit(){
  const model = {
    "option_text": this.form.value.option_text,
    "order": Number(this.form.value.order),
    "score": Number(this.form.value.score)
  }
  this.httpService.post(`exam/question/${this.quiz.data.questionId}/option`, model).subscribe((res) => {
   console.log(res);
   if(res['responseCode'] === '00'){
    this.toastrService.successAlerts('Option added, successfully')
    this.form.reset()
   }else{
    this.toastrService.errorAlerts('Oohps!, something went wrong...')
   }
})
}
  editOptions(data: any) {
   
    this.dialog.open(EditOptionsDialogComponent, {
      data: data,
      // disableClose: true
    })
  
}

close(){
  this.dialogRef.close()
}
}
