import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobCategoryComponent } from './job-category/job-category.component';
import { LocationsComponent } from './locations/locations.component';
import { MenuPageComponent } from './menu-page/menu-page.component';


const routes: Routes = [
  {
    path: '',
    component: MenuPageComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'job/category',
    component: JobCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
