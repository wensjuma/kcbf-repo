import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/common/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl') || '';
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
  }

  ngOnInit() {}

  submitLogin() {
    this.loading = true;
    const model = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    console.log(model);
    this.authService.login("login", model).subscribe(
      (result) => {
       
        if (result["responseCode"] === "00") {
         this.router.navigate([this.returnUrl]);
          this.router.navigate(["/home"]);

          console.log(result);
        }else if(result["responseCode"] === "01") {
          this.errorMessage = result['responseMessage'];
        }

         else {
          this.router.navigate(["/"]);
        }

        //   if (result["field39"] === "00") {
        //
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
