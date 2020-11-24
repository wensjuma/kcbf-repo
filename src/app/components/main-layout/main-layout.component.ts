import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SidebarComponent } from "@syncfusion/ej2-angular-navigations";
import { NotificationDialogComponent } from "./notification-dialog/notification-dialog.component";
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent implements OnInit {
  parent_active: boolean = false;
  settings_active: boolean;
  user_active: any;
  constructor(private dialog: MatDialog, private authService: AuthService) {}
  ngOnInit() {}
  activateChild() {
    if (this.parent_active) {
      this.parent_active = false;
    } else {
      this.parent_active = true;
    }
  } 
  activateUserChild() {
    if (this.user_active) {
      this.user_active = false;
    } else {
      this.user_active = true;
    }
  } 
  activateSettingsChild(){
    if (this.settings_active) {
      this.settings_active = false;
    } else {
      this.settings_active = true;
    }
  }
  openNotifications(notifications: any) {
    this.dialog.open(NotificationDialogComponent, {
      data: {
        notif: notifications
      }
    });
  }
  logout() {
 this.authService.logout()
  }
}
