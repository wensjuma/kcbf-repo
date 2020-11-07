import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { LocationsComponent } from './locations/locations.component';
import { SharedModule } from '../shared/shared.module';
import { LocationDialogComponent } from './locations/location-dialog/location-dialog.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { CreateEditJobCatComponent } from './job-category/create-edit-job-cat/create-edit-job-cat.component';


@NgModule({
  declarations: [LocationsComponent, LocationDialogComponent, MenuPageComponent, JobCategoryComponent, CreateEditJobCatComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationsRoutingModule
  ],
  entryComponents:[
    LocationDialogComponent,
    CreateEditJobCatComponent
  ]
})
export class ConfigurationsModule { }
