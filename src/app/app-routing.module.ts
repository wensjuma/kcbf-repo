import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { AdminGuard } from './common/services/admin.guard';
import { AuthGuard } from "./common/services/auth.guard";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

import { ListPanelistsComponent } from "./panelists/list-panelists/list-panelists.component";


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  
  

  {
    path: "main",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
        import("./dashboard/dashboard.module").then(
          (m) => m.DashboardModule
        ),
      },
      {
        path: "jobs",
        loadChildren: () =>
        import("./jobs/jobs.module").then(
          (m) => m.JobsModule
        ),
      },
     
      {
        path: "panelists",
        canActivate: [AdminGuard],
        component: ListPanelistsComponent,
      },
      // {
      //   path: "results",
      //   component: ShowResultsComponent,
      // },
      {
        path: "users",
        // canActivate: [AdminGuard],
        loadChildren: () =>
          import("./user-management/user-management.module").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "interviews",
        loadChildren: () =>
          import("./interviews/interviews.module").then(
            (m) => m.InterviewsModule
          ),
      },
      {
        path: "myinterviews",
        loadChildren: () =>
          import("./myinterviews/myinterviews.module").then(
            (m) => m.MyinterviewsModule
          ),
      },
      {
        path: "config",
        canActivate: [AdminGuard],
        loadChildren: () =>
        import("./configurations/configurations.module").then(
          (m) => m.ConfigurationsModule
        ),
      }, 
      {
        path: "profile",
        // canActivate: [AdminGuard],
        loadChildren: () =>
        import("./profiles/profiles.module").then(
          (m) => m.ProfilesModule
        ),
      }, 
      
    ],
  },
  {
    path: "home",
    canActivate: [AuthGuard, AdminGuard],
    component: LandingPageComponent,
  }, 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
