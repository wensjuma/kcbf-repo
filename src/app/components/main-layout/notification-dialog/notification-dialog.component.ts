import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {
  notifications: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public notification: any,
    private dialogRef: MatDialogRef<NotificationDialogComponent>) {
    this.notifications = this.notification.notif
   }

  ngOnInit() {
    console.log(this.notifications);
    
  }
close(){
   this.dialogRef.close()
}

}
