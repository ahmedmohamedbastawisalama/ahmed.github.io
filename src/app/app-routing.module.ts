import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UsersComponent } from './pages/users/users.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { AttendancesComponent } from './pages/attendances/attendances.component';
import { ScanComponent } from './pages/scan/scan.component';
import { UserAttendancesComponent } from './pages/user-attendances/user-attendances.component';

import { LogoutComponent } from './pages/logout/logout.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminGuardService as AdminGuard } from './services/admin-guard.service';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'roles',
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'designations',
    component: DesignationsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'attendances',
    component: AttendancesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings/:user_id',
    component: SettingsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'scan/:company_id',
    component: ScanComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'user/attendances',
    component: UserAttendancesComponent,
    canActivate: [AuthGuard],
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
