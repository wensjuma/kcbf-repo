import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-interview-location',
  templateUrl: './interview-location.component.html',
  styleUrls: ['./interview-location.component.scss']
})
export class InterviewLocationComponent implements OnInit {
form: FormGroup
  constructor(
    private httpService: HttpService,
    private _fb: FormBuilder,
    private router: Router
  ) {
    this.form = this._fb.group({
        location_name: ['', Validators.required],
        description: ['', Validators.required],
        location_code: ['', Validators.required]
    })
   }
  ngOnInit() {
  }
  checkLocation(){
      const model= {
       
          "location_name":this.form.value.location_name,
          "description": this.form.value.description,
          "location_code": this.form.value.location_code
      
      }
      this.httpService.post('location', model).subscribe(result=>{
        console.log(result);
        if(result['responseCode']=== '00'){
          alert(result['responseMessage'])
          this.router.navigate(['main/create-interview/interview-details'])
        } else{
          alert('Something went wrong!')
        }
        
      })
  }

}
