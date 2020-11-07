import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
  users: any;
  profile_info: any;

  constructor(
    private httpService: HttpService,
    private auth : AuthService
  ) { }

  ngOnInit() {
    this.httpService.get("users").subscribe((res) => {
      console.log(res);

      this.users = res["data"];
      this.profile_info = this.users.filter((res) => {
        return res.email_address === this.auth.currentUser.sub;
      });
    sessionStorage.setItem('profile_info', JSON.stringify(this.profile_info))
    })
  }

}
