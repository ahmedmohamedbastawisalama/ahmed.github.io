import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UsersComponent } from './pages/users/users.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { AttendancesComponent } from './pages/attendances/attendances.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HeaderComponent } from './pages/include/header/header.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScanComponent } from './pages/scan/scan.component';
import { UserAttendancesComponent } from './pages/user-attendances/user-attendances.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    NotfoundComponent,
    UsersComponent,
    DesignationsComponent,
    AttendancesComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ScanComponent,
    UserAttendancesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }