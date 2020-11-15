import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/common/services/http.service';
import { ToasterAlertService } from 'src/app/common/services/toaster-alert.service';
@Component({
  selector: 'app-edit-options-dialog',
  templateUrl: './edit-options-dialog.component.html',
  styleUrls: ['./edit-options-dialog.component.scss']
})
export class EditOptionsDialogComponent implements OnInit {
public form : FormGroup
  constructor(
    private dialogRef: MatDialogRef<EditOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToasterAlertService,
    private dialog: MatDialog
  ) { 
 
    this.form = this._fb.group({ 
      option_text: [this.data?this.data.option_text:'', Validators.required],
      order: [this.data?this.data.order:'', Validators.required],
      score: [this.data?this.data.score:'', Validators.required],
    })  
  }
  // exam/question/303/option/309
  onSubmit(){
    const model = {
      "option_text": this.form.value.option_text,
      "order": Number(this.form.value.order),
      "score": Number(this.form.value.score)
    }
    this.httpService.put(`exam/question/${this.data.questionId}/option/${this.data.optionId}`, model).subscribe((res) => {
      console.log(res);
      
     if(res['responseCode'] === '00'){
      this.toastrService.successAlerts(res['responseMessages'])
       this.form.reset()
       this.close()
     }else{
      this.toastrService.errorAlerts('Oohps!, something went wrong...')
     }
  })
  }
  ngOnInit() {
  }
  close() {
    this.dialogRef.close()
  }

}
