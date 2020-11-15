import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
@Injectable({
    providedIn: "root",
})
export class HttpService {
    url = this._globalService.apiHost;
    token: string;
    constructor(
        private http: HttpClient,
        private _globalService: GlobalService,
        private _authService: AuthService
    ) {
        this.token = _authService.getToken
            ? _authService.getToken.replace(/^"|"$/g, "")
            : "";
        //   console.log(this.token.replace(/^"|"$/g, ''));
    }
    private static createCompleteRoute(
        route: string,
        envAddress: string
    ): string {
        return `${envAddress}/${route}`;
    }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: "Bearer "+this.token,
        });
    }
    private getHeadersWithoutBearer(): HttpHeaders {
        return new HttpHeaders({
            "Content-Type": "application/json",
        });
    }
    public login(endpoint: any, model: any): any {
        return this.http
            .post(this._globalService.apiHost + endpoint, model, {
                headers: this.getHeadersWithoutBearer(),
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    public post(endpoint: string, model: any): any {
        return this.http
            .post(this._globalService.apiHost + endpoint, model, {
                headers: this.getHeaders(),
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    getFile(url: string) {
        return "http://102.133.170.144:30594/kcb-foundation/api/resource/get/" + url;
    }
    getFileName(filename: any) {
        return filename
            .replace(/^.*[\\\/]/, "")
            .split(".")
            .slice(0, -1)
            .join(".");
    }
    // public patch(endpoint: string): any {
    //     let params = new HttpParams();
    //     // console.log(this.getHeaders());
        
    //     return this.http
    //         .patch(this._globalService.apiHost + endpoint, {
    //             headers: this.getHeaders(),
    //             // params: params,
    //         })
    //         .pipe(
    //             map((response) => {
    //                 response = response;
    //                 return response;
    //             })
    //         );
    // }
    public put(endpoint: string, model: any): any {
        let params = new HttpParams();
        return this.http
            .put(this._globalService.apiHost + endpoint, model, {
                headers: this.getHeaders(),
                params: params
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    public getResource(route: string, httpParams?: any): any {
        return this.http.get<any>(
            HttpService.createCompleteRoute(route, this.url),
            { headers: this.getHeaders(), params: httpParams }
        );
    }
    public patch(endpoint: string): any {
        let params = new HttpParams();
        return this.http
            .patch(this._globalService.apiHost + endpoint, {},{
                headers: this.getHeaders(),
                params: params,
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    public get(endpoint: string): any {
        let params = new HttpParams();      
        return this.http
            .get(this._globalService.apiHost + endpoint, {
                headers: this.getHeaders(),
                params: params,
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    public delete(endpoint: string): any {
        return this.http
            .delete(this._globalService.apiHost + endpoint, {
                headers: this.getHeaders(),
            })
            .pipe(
                map((response) => {
                    response = response;
                    return response;
                })
            );
    }
    getFromJson(endpoint: string): any {
        return this.http.get(endpoint);
    }
    private handleError(error: Response | any) {
        let errorMessage: any = {};
        if (error.status === 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        } else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }
    format(date: NgbDateStruct, format: string): string {
        if (!date) {
            return "";
        }
        const mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) {
            return "";
        }
        return mdt.format(format);
    }
}
