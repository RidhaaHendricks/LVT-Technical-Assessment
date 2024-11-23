/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AdminDashboardComponent } from './app/admin-dashboard.component';

bootstrapApplication(AdminDashboardComponent, appConfig)
  .catch((err) => console.error(err));
