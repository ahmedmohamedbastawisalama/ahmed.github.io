import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loading: boolean | undefined;
  user: any = {};
  roles: any = [];
  designations: any = [];
  userForm: any;
  activeTab = 1;
  user_id: any;
  url = environment.url;
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    private formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      confirm_password: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.activeRoute.snapshot.paramMap.get('user_id')) {
      this.user_id = this.activeRoute.snapshot.paramMap.get('user_id');
    } else {
      this.user_id = this.auth.user.id;
    }

    this.getUser();
  }

  submit() {
    if (this.userForm.dirty && this.userForm.valid) {

      if(this.userForm.value.password === this.userForm.value.confirm_password) {
        this.update();
      } else {
        this.fun.presentAlertError("Both password should be same.");
      }
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  update() {
    this.loading = true;
    this.api.put(`authenticated/users/password/company/?id=${this.user_id}`, this.userForm.value)
      .subscribe((response: any) => {
        this.loading = false;
        this.userForm.reset();
        this.fun.presentAlert("Password has been updated.");
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

  getUser() {
    this.loading = true;
    this.api.get(`crud/users/${this.user_id}`)
      .subscribe((response: any) => {
        this.loading = false;
        this.user = response;
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }
}