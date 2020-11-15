"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreviewResponsesComponent = void 0;
var core_1 = require("@angular/core");
var results_dialog_component_1 = require("../questionnaire/results-dialog/results-dialog.component");
var PreviewResponsesComponent = /** @class */ (function () {
    function PreviewResponsesComponent(dialog, httpService, router) {
        this.dialog = dialog;
        this.httpService = httpService;
        this.router = router;
        this.stored_response = JSON.parse(localStorage.getItem('store_response'));
        console.log(this.stored_response);
        this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
        this.start_interview_details = JSON.parse(sessionStorage.getItem("startinterview_data"));
        // this.final_score = JSON.parse(
        //   sessionStorage.getItem("score_totals")
        // ); 
    }
    PreviewResponsesComponent.prototype.viewResults = function (res) {
        // this.router.navigate(['main/interviews/preview'])
        var dialogRef = this.dialog.open(results_dialog_component_1.ResultsDialogComponent, {
            data: {
                data: res,
                interviewee: this.start_interview_details
            },
            disableClose: true,
            width: "600px"
        });
    };
    PreviewResponsesComponent.prototype.editResponse = function (response) {
        this.router.navigate(['main/interviews/interviewee']);
    };
    PreviewResponsesComponent.prototype.backToInterview = function () {
        this.router.navigate(['main/interviews/interviewee']);
    };
    PreviewResponsesComponent.prototype.endActualInterview = function () {
        var _this = this;
        var model = {
            interview_score: 0,
            interview_id: this.interview_details.interview_id,
            recommendation: "end interview"
        };
        this.httpService
            .put("interviewee/" + this.start_interview_details.intervieweeId + "/start/" + this.interview_details.interview_id, model)
            .subscribe(function (result) {
            // console.log(result);
            _this.outcome = result["data"];
            console.log(_this.outcome);
            if (result["responseCode"] === "00") {
                sessionStorage.setItem("outcome", JSON.stringify(_this.outcome));
                _this.viewResults(_this.outcome);
                // sessionStorage.setItem("startinterview_data", JSON.stringify(data));
                // this.router.navigate(['main/interviews/interviewee'])
            }
        });
    };
    PreviewResponsesComponent.prototype.ngOnInit = function () {
    };
    PreviewResponsesComponent = __decorate([
        core_1.Component({
            selector: 'app-preview-responses',
            templateUrl: './preview-responses.component.html',
            styleUrls: ['./preview-responses.component.css']
        })
    ], PreviewResponsesComponent);
    return PreviewResponsesComponent;
}());
exports.PreviewResponsesComponent = PreviewResponsesComponent;
