import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './shared/shared.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,MatDialogModule,
  MatTooltipModule, MatPaginatorModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS
} from '@angular/material';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListPanelistsComponent } from './panelists/list-panelists/list-panelists.component';
import { CreatePanelistDialogComponent } from './panelists/create-panelist-dialog/create-panelist-dialog.component';


import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
// import { FormlyFieldStepper } from './interviewee/stepper.type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NotificationDialogComponent } from './components/main-layout/notification-dialog/notification-dialog.component';
import { CreateUserComponent } from './user-management/users/create-user/create-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { SystemHttpInterceptor } from './common/services/system-http.interceptor';
import { JwtInterceptor } from './common/services/helpers/jwt-http.interceptor';

import { ToastrModule} from 'ngx-toastr'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterviewResultsComponent } from './interview-results/interview-results.component';
import { CountdownModule } from 'ngx-countdown';
import { MarkdownEditorModule } from './interviews/create-interview/interview-components/markdown-editor/markdown-editor.module';
import { MatMarkdownEditorModule } from 'mat-markdown-editor';
import { NgxMatDateAdapter, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
// import { MatMarkdownEditorModule } from 'mat-markdown-editor';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideBarComponent,
    LoginComponent,
    LandingPageComponent,
    ListPanelistsComponent,
    NotificationDialogComponent,
    CreatePanelistDialogComponent,
    InterviewResultsComponent 
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    MatMarkdownEditorModule.forRoot(),
    // SharedModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    FormlyBootstrapModule,
    // FormlyModule.forRoot({
    //   validationMessages: [
    //     { name: 'required', message: 'This field is required' },
    //   ],
    //   types: [
    //     { name: 'stepper', component: FormlyFieldStepper, wrappers: ['form-field'] },
    //   ],
    // }),
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgbModule,
    
   ToastrModule.forRoot(
     {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
     }
   ),
   CountdownModule,
    MarkdownEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule, NgxMatMomentModule
  ],
  exports:[
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
   
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DatePipe,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: SystemHttpInterceptor,
      
        multi: true,
    },

  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass:  JwtInterceptor,
     
  //     multi: true,
  //   },
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  entryComponents:[
   CreatePanelistDialogComponent,
   NotificationDialogComponent,
  
  //  CreateUserComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
