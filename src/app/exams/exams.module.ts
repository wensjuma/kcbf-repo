import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ConfigExamsComponent } from './config-exams/config-exams.component';
import { SharedModule } from '../shared/shared.module';
import { AddExamDialogComponent } from './config-exams/add-exam-dialog/add-exam-dialog.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { QuestionnaireComponent } from './view-exam/questionnaire/questionnaire.component';
import { AddQuizOptionComponent } from './add-quiz-option/add-quiz-option.component';
import { AddNewQuizComponent } from './add-new-quiz/add-new-quiz.component';
import { EditOptionsDialogComponent } from './add-quiz-option/edit-options-dialog/edit-options-dialog.component';


@NgModule({
  declarations: [ConfigExamsComponent,
    AddExamDialogComponent,
    ViewExamComponent,
    AddQuizOptionComponent,
    AddNewQuizComponent,
    QuestionnaireComponent,
    EditOptionsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExamsRoutingModule
  ],
  entryComponents: [
    AddExamDialogComponent,
    AddQuizOptionComponent,
    AddQuizOptionComponent,
    AddNewQuizComponent,
    EditOptionsDialogComponent
    
  ]
})
export class ExamsModule { }
