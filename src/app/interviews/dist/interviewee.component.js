"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IntervieweeComponent = void 0;
var stepper_1 = require("@angular/cdk/stepper");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var IntervieweeComponent = /** @class */ (function () {
    function IntervieweeComponent(_formBuilder, httpService, dialog, _elementRef, router) {
        var _this = this;
        this._formBuilder = _formBuilder;
        this.httpService = httpService;
        this.dialog = dialog;
        this._elementRef = _elementRef;
        this.router = router;
        this.page = 1;
        this.pageSize = 20;
        this.responses = [];
        this.interview_details = JSON.parse(sessionStorage.getItem("interview_more"));
        this._responses = JSON.parse(sessionStorage.getItem("responses"));
        console.log(this._responses);
        this._responses.map(function (res) {
            _this.form = _this._formBuilder.group({
                responseOption: new forms_1.FormControl(null, [forms_1.Validators.required])
            });
        });
        // this.form = this._formBuilder.group({});
        // this.questionss.forEach(question => {
        //   this.form.addControl(question.name, this._formBuilder.control(null, Validators.required));
        // })
        this.timeData = this.interview_details.session_length_min * 60;
        this.score_array = [];
        this.total_score_array = [];
    }
    IntervieweeComponent.prototype.ngOnChanges = function () {
        if (this.timeData <= 1000) {
            this.timeout = true;
        }
    };
    IntervieweeComponent.prototype.loadInterviewQuestions = function () {
        var _this = this;
        this.start_interview_details = JSON.parse(sessionStorage.getItem("startinterview_data"));
        this.httpService
            .get("questions/interview/" + this.interview_details.interview_id)
            .subscribe(function (res) {
            _this.questions = res.data;
            // this.options = res.data.map((res) => res.options);
        });
    };
    IntervieweeComponent.prototype.getValue = function (evt, data) {
        var _this = this;
        console.log(data);
        console.log(evt);
        data.answered = true;
        data.scored = evt.score;
        this.option_result = evt.score;
        this.data_result = evt.score;
        var model = {
            question_id: data.questionId,
            option_id: evt.optionId,
            notes: "Test notes",
            score: evt.score
        };
        console.log(model);
        this.httpService
            .put("interviewee/" + this.start_interview_details.intervieweeId + "/score/" + this.interview_details.interview_id, model)
            .subscribe(function (res) {
            var store_res = evt;
            // store responses incase you want to edit 
            _this.responses.push(res['data']);
            sessionStorage.setItem("responses", JSON.stringify(_this.responses));
            store_res["question"] = data.question;
            _this.score_array.push(store_res);
            _this.total_score_array.push(res.data.score);
            localStorage.setItem("store_response", JSON.stringify(_this.score_array));
            _this.final_score = _this.total_score_array.reduce(function (a, b) { return a + b; });
        });
        sessionStorage.setItem("score_totals", JSON.stringify(this.final_score));
    };
    IntervieweeComponent.prototype.viewResults = function () {
        this.router.navigate(["main/interviews/preview"]);
    };
    IntervieweeComponent.prototype.ngOnInit = function () {
        this.loadInterviewQuestions();
        this.interviewDetails = JSON.parse(sessionStorage.getItem("interview-details"));
        this.interviewee = JSON.parse(sessionStorage.getItem("interviewee"));
    };
    IntervieweeComponent.prototype.ngAfterViewInit = function () { };
    IntervieweeComponent = __decorate([
        core_1.Component({
            selector: "app-interviewee",
            templateUrl: "./interviewee.component.html",
            styleUrls: ["./interviewee.component.scss"],
            providers: [
                {
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS,
                    useValue: { showError: true }
                },
            ]
        })
    ], IntervieweeComponent);
    return IntervieweeComponent;
}());
exports.IntervieweeComponent = IntervieweeComponent;
