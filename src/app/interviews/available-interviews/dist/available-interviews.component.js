"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AvailableInterviewsComponent = void 0;
var core_1 = require("@angular/core");
var subsink_1 = require("subsink");
var interview_details_component_1 = require("../create-interview/interview-components/interview-details/interview-details.component");
var AvailableInterviewsComponent = /** @class */ (function () {
    function AvailableInterviewsComponent(httpService, router, dialog, authService, datePipe) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.dialog = dialog;
        this.authService = authService;
        this.datePipe = datePipe;
        this.interviews = [];
        this.subs = new subsink_1.SubSink();
        this.settings = {
            selectMode: "single",
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                columnTitle: "Actions",
                add: false,
                edit: false,
                "delete": false,
                custom: [
                    {
                        name: "editrecord",
                        title: '<span class="btn btn-sm btn-info"><i class="fa fa-pencil-square"></i></span>&nbsp;'
                    },
                    {
                        name: "viewrecord",
                        title: '&nbsp;<span class="btn btn-sm btn-success">More Action</span>'
                    },
                ],
                position: "right"
            },
            "delete": {
                deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
                confirmDelete: true
            },
            noDataMessage: "No data found",
            columns: {
                index: {
                    title: "sr_no",
                    type: "text",
                    filter: false,
                    width: "60px",
                    valuePrepareFunction: function (value, row, cell) {
                        return cell.row.index + 1;
                    }
                },
                interview_name: {
                    title: "Interview",
                    type: "string",
                    filter: false,
                    width: "150px"
                },
                description: {
                    title: "Description",
                    type: "string",
                    filter: false,
                    width: "170px"
                },
                location_name: {
                    title: "Room",
                    type: "string",
                    filter: false,
                    width: "140px"
                },
                location_code: {
                    title: "Room code",
                    type: "string",
                    filter: false,
                    width: "110px"
                },
                start_date: {
                    title: "Date|Time",
                    type: "string",
                    filter: false,
                    width: "170px",
                    valuePrepareFunction: function (date) {
                        var raw = new Date(date);
                        var formatted = _this.datePipe.transform(raw, "dd MMM yyyy HH:mm:ss");
                        return formatted;
                    }
                }
            },
            attr: {
                "class": "table table-bordered table-striped"
            },
            pager: {
                display: true,
                perPage: 20
            }
        };
    }
    AvailableInterviewsComponent.prototype.ngOnInit = function () {
        // if (this.authService.currentUser.sub === "m2@gmail.com") {
        this.loadInterviews();
        // } else {
        //   this.loadPanelistInterviews();
        // }
        // this.loadInterviews();
    };
    AvailableInterviewsComponent.prototype.loadInterviews = function () {
        var _this = this;
        this.httpService.get("interview").subscribe(function (result) {
            _this.interviews = result["data"]; //? result["data"].reverse():'';
            console.log(_this.interviews);
        });
    };
    // loadPanelistInterviews() {
    //   //  interviewer/interviews
    //   this.httpService.get("interviewer/interviews").subscribe((result) => {
    //     // this.interviews = result["data"]; //? result["data"].reverse():'';
    //     console.log(this.interviews);
    //   });
    // }
    AvailableInterviewsComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    AvailableInterviewsComponent.prototype.getInterviewById = function () {
    };
    AvailableInterviewsComponent.prototype.viewMore = function (data) {
        var _this = this;
        this.httpService.get("interview/" + data.interview_id).subscribe(function (result) {
            console.log(result);
            _this.get_interview = result["data"];
            console.log(_this.get_interview);
            sessionStorage.setItem("interview_job", JSON.stringify(_this.get_interview));
        });
        sessionStorage.setItem("interview_more", JSON.stringify(data));
        this.router.navigate(["main/interviews/interview", data.interview_id]);
    };
    AvailableInterviewsComponent.prototype.createInterview = function (data, mode) {
        var _this = this;
        var dialogRef = this.dialog.open(interview_details_component_1.InterviewDetailsComponent, {
            data: {
                data: data,
                job: this.get_interview,
                mode: mode
            },
            width: "700px"
        });
        dialogRef.afterClosed().subscribe(function (res) {
            _this.loadInterviews();
        });
    };
    AvailableInterviewsComponent.prototype.onCustomAction = function (event) {
        switch (event.action) {
            case "viewrecord":
                this.viewMore(event.data);
                break;
            case "editrecord":
                this.createInterview(event.data, event.mode);
                break;
            default:
                break;
        }
    };
    AvailableInterviewsComponent = __decorate([
        core_1.Component({
            selector: "app-available-interviews",
            templateUrl: "./available-interviews.component.html",
            styleUrls: ["./available-interviews.component.css"]
        })
    ], AvailableInterviewsComponent);
    return AvailableInterviewsComponent;
}());
exports.AvailableInterviewsComponent = AvailableInterviewsComponent;
