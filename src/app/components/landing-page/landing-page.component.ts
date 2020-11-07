import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  createImg: boolean;
  formImg: boolean
  userImg: boolean
  currentUser: any;
  constructor(
    private authService: AuthService
  ) { 
    this.createImg = false;
    this.formImg = false
    this.userImg =false;
    this.currentUser = this.authService.currentUser
  }

  ngOnInit() {
    console.log(this.authService.currentUser);
    
  }

}
