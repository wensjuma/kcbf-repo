// import { ToastrService } from 'ngx-toastr';

import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  private _currentUser: any;
  public loggedIn = false;
  public redirectURL = "";
  //token: any;

  constructor(
    // private handler: HttpBackend,
    private _router: Router,
    private http: HttpClient,
    public _globalService: GlobalService // private toastrService: ToastrService
  ) {
    this.isAdmin();
    const token = this.getToken;
    if (token) {
      this._currentUser = this.jwtHelper.decodeToken(token);
    }
    this.isAuthenticated();
  }

  private static generateHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
  }
  public login(endpoint: string, model: any) {
    return this.http
      .post(
        this._globalService.apiHost + endpoint,
        model,
        AuthService.generateHeaders()
      )
      .pipe(
        map((data) => {
          console.log(data);
          if (data["responseCode"] === "00") {
              sessionStorage.setItem("auth_token", JSON.stringify(data['data']['token']))
              this._currentUser = this.jwtHelper.decodeToken(
                  sessionStorage.getItem("auth_token")
              );
              this.loggedIn = true;
              return data;
          } else {
              sessionStorage.removeItem("auth_token");
              this.loggedIn = false;
          }
          return data;
          // console.log(data);
        })
      );
  }
  public logout(): void {
    sessionStorage.removeItem("auth_token");
    this._currentUser = null;
    this.loggedIn = false;
    this._router.navigate(["/"]);
  }
  public getRoles(): any {}
  get getToken(): any {
    return sessionStorage.getItem("auth_token");
  }
  get getTellerData() {
    let tellerData = sessionStorage.getItem("teller-info");
    return JSON.parse(tellerData);
  }
  get currentUser() {
    if (this.isAuthenticated()) {
        // console.log(this._currentUser);
      return this._currentUser;
    } else {
      return null;
    }
  }
  public checkToken(): any {
    return !!sessionStorage.getItem("auth_token");
  }
  public unauthorizedAccess(error: any): void {
    console.log(error);
    this.logout();
    this._router.navigate(["/auth/login"]);
  }

  public isLoggedIn(): boolean {
    // return tokenNotExpired('hims-token');

    return true;
  }
  isAuthenticated(): boolean {
    const token = this.getToken;
    if (token) {
      !this.jwtHelper.isTokenExpired(token);
      return true;
    } else {
      this.logout();
    }
  }
  get getUserData() {
    return true;
  }
  isAdmin(): boolean {
    const admin = this.getTellerData;
    if (admin) {
      return false;
    }
    return true;
  }

  public getJWTValue(): any {
    const token = this.getToken;
    return this.jwtHelper.decodeToken(token);
  }

  private handleError(error: Response | any) {
    let errorMessage: any = {};
    // Connection error
    if (error.status === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: "Sorry, there was a connection error occurred. Please try again."
      };
    } else {
      errorMessage = error.json();
    }
    return Observable.throw(errorMessage);
  }
}
