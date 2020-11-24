import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import * as moment from "moment";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
// import { ChannelDetails } from '../models/interface-model';
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  public apiHost: string;
  // channel_details: ChannelDetails
  public setting: any = {};

  constructor(
    private datePipe: DatePipe
  ) // private deviceService: DeviceDetectorService
  {
    this.apiHost = "http://102.133.170.144:30594/kcb-foundation/api/"; //environment.baseUrl;
    // this.channel_details = {
    //   useragentversion: this.deviceService.getDeviceInfo().os_version,
    //   useragent: this.deviceService.getDeviceInfo().userAgent
    // };
  }

  loadGlobalSettingsFromsessionStorage(): void {
    if (sessionStorage.getItem("backend-setting") != null) {
      this.setting = JSON.parse(sessionStorage.getItem("backend-setting"));
    }
  }

  public handleServerErrors(result: any): any {
    let isValidationError = false;
    let errorMessage;
    /*    this.message.error('Encountered an error', { nzDuration: 2000 });
        switch (result.responseCode) {
          case 400:
            errorMessage = 'Wrong method';
            break;
          case 401:
            errorMessage = 'Session Expired';
            this.message.error('Your session  has expired', { nzDuration: 4000 });
            break;
          case 403:
            errorMessage = 'UnAuthorized';
            break;
          case 422:
            isValidationError = true;
            errorMessage = Array.from(Object.keys(result.error_messages), k => result.error_messages[k]);
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
        }
        return { errorMessage: errorMessage, isValidationError: isValidationError  };
        **/
  }

  public validateOnClientSide(validateForm: any): boolean {
    let hasClientValidationError = false;
    for (const i in validateForm.controls) {
      if (validateForm.controls) {
        validateForm.controls[i].markAsDirty();
        validateForm.controls[i].updateValueAndValidity();
        if (validateForm.controls[i].errors !== null) {
          hasClientValidationError = true;
        }
      }
    }
    return hasClientValidationError;
  }

  // get Unique values in an array
  public uniqueBy(arr: any, fn: any): any {
    const unique = {};
    const distinct = [];
    arr.forEach(function (x: any): any {
      const key = fn(x);
      if (!unique[key]) {
        distinct.push(key);
        unique[key] = true;
      }
    });
    return distinct;
  }
  // Returns an array of dates between the two dates
  enumerateDaysBetweenDates(startDate: any, endDate: any): any {
    startDate = moment(startDate);
    endDate = moment(endDate);
    const now = startDate;
    const dates = [];
    while (now.isBefore(endDate) || now.isSame(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  }
  transformDate(date: NgbDateStruct) {
    const picked_date = new Date(date.year, date.month - 1, date.day);
    return this.datePipe.transform(picked_date, "dd-MM-yyyy");
  }

  transformDateRange(dateRange: any) {
    const newDate = dateRange.toString().split(" ");
    const month = newDate[1];
    const day = newDate[2];
    const year = newDate[3];
    return this.stringToDate(month + " " + day + ", " + year);
  }

  stringToDate(dateString: string) {
    return {
      year: new Date(dateString).getFullYear(),
      month: new Date(dateString).getMonth() + 1,
      day: new Date(dateString).getDate(),
    };
  }

  stringToTime(timeString: string) {
    const newTime = timeString.split(":");
    return { hour: +newTime[0], minute: +newTime[1], second: +newTime[2] };
  }

  transformTime(time: any, seconds?: boolean): any {
    if (seconds) {
      return time.hour + ":" + time.minute + ":" + time.second;
    } else {
      const hour =  time.hour >= 10? time.hour:  "0" + time.hour 
      const minute =  time.minute >= 10? time.minute:  "0" + time.minute 
      return  hour +':'+ minute
    }
  }

  backDate(date) {
    const newDate = new Date(date.year, date.month, date.day);
    return new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate() - 365
    );
  }

  /**
   * Shuffles array in place. ES6 version
   */
  public shuffle(a: any): any {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  public getUserInfo(): any {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user);
  }
  public getUserPermissions(): any {
    const permissions = sessionStorage.getItem("permissions");
    return JSON.parse(permissions);
  }
  public getToken(): any {
    console.log(sessionStorage.getItem("auth_token"));

    return sessionStorage.getItem("auth_token");
  }
}
