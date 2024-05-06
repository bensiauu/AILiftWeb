import { Routes } from '@angular/router';
import { AppTemplateRoutes } from '@dis/settings/routes/routes.template.config';
import { RoleTypes } from '@dis/auth/roles.enum';

// Import your app views below and add the array below
// For reference, see routes.template.config.js

export const AppRoutes: Routes = [
  // Define a default redirect
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  ...AppTemplateRoutes
];
