import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';
import { FunctionsService } from "../../services/functions.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: any;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    private router: Router,
    private auth: AuthService,
    private fun: FunctionsService,
  ) {
    if (this.auth.is_login) {
      this.navigate();
      return;
    }
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  loading!: Boolean;
  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.register();
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  register() {
    this.loading = true;
    this.api.post_('auth/register-admin/users', this.userForm.value)
      .subscribe((response: any) => {
        this.loading = false;
        if (response.access_token && response.refresh_token) {
          this.auth.setLogin(response);
          this.navigate();
        } else {
          this.fun.presentAlertError(response.message);
        }
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

  createQr() {
    this.loading = true;
    this.api.post(`authenticated/users/qr/`, {})
      .subscribe((response: any) => {
        this.loading = false;
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

  navigate() {
    this.createQr();
    this.router.navigateByUrl(`dashboard`);
  }
}