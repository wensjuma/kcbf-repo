"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.InterviewDetailsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var material_1 = require("@angular/material");
var stepper_1 = require("@angular/cdk/stepper");
var InterviewDetailsComponent = /** @class */ (function () {
    function InterviewDetailsComponent(httpService, _fb, router, toastrService, globalService, config, dialogRef, _data) {
        var _this = this;
        this.httpService = httpService;
        this._fb = _fb;
        this.router = router;
        this.toastrService = toastrService;
        this.globalService = globalService;
        this.config = config;
        this.dialogRef = dialogRef;
        this._data = _data;
        this.disabled = false;
        this.showSpinners = true;
        this.showSeconds = false;
        this.touchUi = false;
        this.enableMeridian = false;
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.color = "primary";
        this.listColors = ["primary", "accent", "warn"];
        this.stepHours = [1, 2, 3, 4, 5];
        this.stepMinutes = [1, 5, 10, 15, 20, 25];
        this.stepSeconds = [1, 5, 10, 15, 20, 25];
        this.serviceDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        };
        this.serviceTime = { hour: 8, minute: 0, second: 0 };
        this.seconds = true;
        this.init = {
            menubar: false,
            toolbar: "undo redo | formatselect | " +
                "bold italic | alignleft aligncenter" +
                "alignright alignjustify | bullist numlist outdent indent |" +
                "removeformat"
        };
        this.options = {
            enablePreviewContentClick: false,
            resizable: true,
            showBorder: true,
            hideIcons: {},
            hideToolbar: false,
            height: '500px',
            mode: 'editor',
            toolbarColor: 'primary',
            preRender: this.preRender
        };
        this.submitted = false;
        var current = new Date();
        config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() + 1 };
        config.outsideDays = 'hidden';
        this.editForm = JSON.parse(sessionStorage.getItem("edit_interview_data"));
        if (this._data.data) {
            this.httpService.get("interview/" + this._data.data.interview_id).subscribe(function (result) {
                console.log(result);
                _this.get_interview = result["data"];
                sessionStorage.setItem("interview_job", JSON.stringify(_this.get_interview));
            });
        }
        this.form = this._fb.group({
            interview_name: [
                this._data.data ? this._data.data.interview_name : "",
                forms_1.Validators.required,
            ],
            location_id: [
                this._data.data ? this._data.data.location_name : null,
                forms_1.Validators.required,
            ],
            start_date: [
                this._data.data ? this._data.data.start_date : ""
            ],
            description: [this._data.data ? this._data.data.description : ""],
            session_length: [
                this._data.data ? this._data.data.session_length_min : "",
                forms_1.Validators.required,
            ]
        });
        this.location.setValue(this._data.data);
        if (_data.mode) {
            this.title = "Create interview";
            this.sec_title = "Create job";
        }
        else {
            this.title = "Edit interview";
            this.sec_title = "Edit job";
        }
        // console.log(this._data.data);
    }
    InterviewDetailsComponent.prototype.preRender = function (markDown) {
        return markDown;
    };
    Object.defineProperty(InterviewDetailsComponent.prototype, "location", {
        get: function () { return this.form.get('location_id'); },
        enumerable: false,
        configurable: true
    });
    ;
    InterviewDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._job = JSON.parse(sessionStorage.getItem('interview_job')).job_listing;
        this.jobForm = this._fb.group({
            "application_end_date": [this._job ? this._job.application_end_date : null, forms_1.Validators.required],
            "job_field": [this._job ? this._job.job_field : null, forms_1.Validators.required],
            "work_location": [this._job ? this._job.work_location : null, forms_1.Validators.required],
            "category_id": [this._job.category ? this._job.category.category_name : null, forms_1.Validators.required],
            "min_salary": [this._job ? this._job.min_salary : null, forms_1.Validators.required],
            "max_salary": [this._job ? this._job.max_salary : null, forms_1.Validators.required],
            "job_type": [this._job ? this._job.job_type : null, forms_1.Validators.required],
            "job_title": [this._job ? this._job.job_title : null, forms_1.Validators.required],
            "description": [this._job ? this._job.description : ''],
            "qualifications": [this._job ? this._job.qualifications : null, forms_1.Validators.required],
            "role": [this._job ? this._job.role : null, forms_1.Validators.required]
        });
        this.httpService.get("locations").subscribe(function (result) {
            // console.log(result);
            _this.locations = result["data"];
        });
        this.loadJobCategories();
        // this.getInterviewById()
    };
    InterviewDetailsComponent.prototype.onSubmit = function (service) {
        var currentYear = moment().year();
        this.minDate = moment([currentYear - 1, 0, 1]);
        this.maxDate = moment([currentYear + 1, 11, 31]);
        if (this._data.mode) {
            this.createInterview(service);
        }
        else {
            this.editInterviewOnly();
        }
    };
    InterviewDetailsComponent.prototype.loadJobCategories = function () {
        var _this = this;
        this.httpService.get("job/categories").subscribe(function (result) {
            _this.category = result["data"];
            // console.log(this.category);
        });
    };
    InterviewDetailsComponent.prototype.createInterview = function (service) {
        var _this = this;
        var interview_date = moment(service.start_date._d).format('DD-MM-YYYY hh:mm');
        this.submitted = true;
        var model = {
            interview_name: this.form.value.interview_name,
            description: this.form.value.description,
            session_length_min: this.form.value.session_length,
            location_id: Number(this.form.value.location_id),
            start_date: interview_date,
            job_listing: null
        };
        sessionStorage.setItem('form-model', JSON.stringify(model));
        this.httpService.post("interview/create", model).subscribe(function (result) {
            console.log(result);
            if (result["responseCode"] === "00") {
                // this.created_interview = result.data
                _this.toastrService.successAlerts(result["responseMessage"]);
                sessionStorage.setItem("interview-details", JSON.stringify(result));
                _this.router.navigate(["main/interviews/list/interviews"]);
            }
            else {
                _this.toastrService.handleErrors(result);
            }
        });
    };
    InterviewDetailsComponent.prototype.submitInterviewJob = function () {
        var _this = this;
        this.created_interview = JSON.parse(sessionStorage.getItem("interview-details"));
        var application_date = moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
        var model = {
            "application_end_date": application_date,
            "job_field": this.jobForm.value.job_field,
            "work_location": this.jobForm.value.work_location,
            "category_id": Number(this.jobForm.value.category_id),
            "min_salary": Number(this.jobForm.value.min_salary),
            "max_salary": Number(this.jobForm.value.max_salary),
            "job_type": this.jobForm.value.job_type,
            "job_title": this.jobForm.value.job_title,
            "description": this.jobForm.value.description,
            "qualifications": this.jobForm.value.qualifications,
            "role": this.jobForm.value.role
        };
        this.httpService.post("job/modify/" + this.created_interview.data.interview_id, model)
            .subscribe(function (result) {
            console.log(result);
            if (result["responseCode"] === "00") {
                _this.toastrService.successAlerts(result["responseMessage"]);
                _this.router.navigate(["main/interviews/list/interviews"]);
                _this.close();
            }
            else {
                _this.toastrService.handleErrors(result);
            }
        });
    };
    InterviewDetailsComponent.prototype.editInterview = function () {
        var _this = this;
        this.update_submitted = true;
        var interview_date = moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
        var application_date = moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
        var model = {
            interview_name: this.form.value.interview_name,
            description: this.form.value.description,
            session_length_min: this.form.value.session_length,
            location_id: Number(this.form.value.location_id),
            start_date: interview_date,
            job_listing: {
                "application_end_date": application_date,
                "job_field": this.jobForm.value.job_field,
                "work_location": this.jobForm.value.work_location,
                "category_id": Number(this.jobForm.value.category_id),
                "min_salary": Number(this.jobForm.value.min_salary),
                "max_salary": Number(this.jobForm.value.max_salary),
                "job_type": this.jobForm.value.job_type,
                "job_title": this.jobForm.value.job_title,
                "description": this.jobForm.value.description,
                "qualifications": this.jobForm.value.qualifications,
                "role": this.jobForm.value.role
            }
        };
        this.httpService
            .put("interview/" + this._data.data.interview_id, model)
            .subscribe(function (result) {
            console.log(result);
            if (result["responseCode"] === "00") {
                _this.toastrService.successAlerts(result["responseMessage"]);
                sessionStorage.setItem("interview-details", JSON.stringify(result));
                _this.router.navigate(["main/interviews/list/interviews"]);
                _this.close();
            }
            else {
                _this.errorMessage = result['errors'];
                _this.toastrService.handleErrors(result);
            }
        });
    };
    InterviewDetailsComponent.prototype.editInterviewOnly = function () {
        var _this = this;
        this.update_submitted = true;
        var interview_date = moment(this.form.value.start_date._d).format('DD-MM-YYYY hh:mm');
        var application_date = moment(this.jobForm.value.application_end_date).format('DD-MM-YYYY hh:mm');
        var model = {
            interview_name: this.form.value.interview_name,
            description: this.form.value.description,
            session_length_min: this.form.value.session_length,
            location_id: Number(this.form.value.location_id),
            start_date: interview_date,
            job_listing: null
        };
        this.httpService
            .put("interview/" + this._data.data.interview_id, model)
            .subscribe(function (result) {
            console.log(result);
            if (result["responseCode"] === "00") {
                _this.toastrService.successAlerts(result["responseMessage"]);
                sessionStorage.setItem("interview-details", JSON.stringify(result));
                _this.router.navigate(["main/interviews/list/interviews"]);
                // this.close()
            }
            else {
                _this.toastrService.handleErrors(result);
            }
        });
    };
    InterviewDetailsComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    Object.defineProperty(InterviewDetailsComponent.prototype, "descriptionControl", {
        get: function () {
            return this.form.controls.description;
        },
        enumerable: false,
        configurable: true
    });
    InterviewDetailsComponent.prototype.toggleJobListing = function (event) {
        if (this.add_listing_option) {
            this.add_listing_option = false;
        }
        else {
            this.add_listing_option = true;
        }
    };
    InterviewDetailsComponent.prototype.toggleJobListingEdit = function (event) {
        if (this.edit_listing_option) {
            this.edit_listing_option = false;
        }
        else {
            this.edit_listing_option = true;
        }
    };
    __decorate([
        core_1.ViewChild("picker", { static: true })
    ], InterviewDetailsComponent.prototype, "picker");
    InterviewDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-interview-details",
            templateUrl: "./interview-details.component.html",
            styleUrls: ["./interview-details.component.scss"],
            providers: [
                {
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS,
                    useValue: { showError: true }
                },
            ]
        }),
        __param(7, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], InterviewDetailsComponent);
    return InterviewDetailsComponent;
}());
exports.InterviewDetailsComponent = InterviewDetailsComponent;
