import { Routes } from '@angular/router';
import { AuthGuard } from '@dis/auth/auth.guard';
import { RoleTypes } from '@dis/auth/roles.enum';

/**
 *  BELOW ARE ROUTES USED IN TEMPLATE
 *  DO NOT EDIT
 *
 *  Treat this as a sample when you link your pages in routes.config.ts
 */

// NOTE: Do not add views within /DIS folder (this folder will be updated and your project specific code shouldn't be here)
// The views below are within /DIS folder because we created them and are responsible for updating them
import { LoginComponent } from '@dis/views/login/login.component';
import { SamplePageComponent } from '@dis/views/sample-page/sample-page.component';
import { EditedPageComponent } from '@dis/views/edited-page/edited-page.component';
import {DashboardOneComponent} from '@dis/views/dashboard-one/dashboard-one.component';
import {DashboardTwoComponent} from '@dis/views/dashboard-two/dashboard-two.component';
import {DashboardThreeComponent} from '@dis/views/dashboard-three/dashboard-three.component';
import {TablesComponent} from '@dis/views/tables/tables.component';
import {InputFieldsComponent} from '@dis/views/input-fields/input-fields.component';
import {FormFillingComponent} from '@dis/views/form-filling/form-filling.component';
import { ProfileSettingComponent } from '@dis/components/profile-setting/profile-setting.component';

//AI Lift
import { DashboardComponent } from '../../../dashboard/dashboard.component';
import { DashboardV2Component } from 'src/app/dashboard-v2/dashboard-v2.component';
import { LiftDetailsComponent } from 'src/app/lift-details/lift-details.component';
export const AppTemplateRoutes: Routes = [
  // Below is how to include a page
  { path: 'login', component: LoginComponent },
  // Below is how to include a page that can be accessed after any user is logged in
  {
    path: 'sample',
    component: SamplePageComponent,
    canActivate: [AuthGuard], // To accept ALL access after login, use AuthGuardService
    data: {
      elevation: [
        
      ] 
    }
  },
  // Below is how to include a page that can be accessed after a user with SPECIFIED role is logged in
  {
    path: 'sample2',
    component: EditedPageComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'dashboard-one',
    component: DashboardOneComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'dashboard-two',
    component: DashboardTwoComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'dashboard-three',
    component: DashboardThreeComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'table',
    component: TablesComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'input-field',
    component: InputFieldsComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'form-filling',
    component: FormFillingComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'dashboard-v2',
    component: DashboardV2Component,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'lift-details/:name',
    component: LiftDetailsComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  {
    path: 'setting',
    component: ProfileSettingComponent,
    canActivate: [AuthGuard], // ONLY acceptable ELEVATION can access after login
    data: {
      elevation: [

      ] // List out all roles that are acceptable
    }
  },
  { path: '**', redirectTo: '' }
];
