import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionsService } from '../../services/functions.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: any;
  company_id : any;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    private router: Router,
    private auth: AuthService,
    private fun: FunctionsService,
    public activeRoute: ActivatedRoute
  ) {
    if (this.auth.is_login) {
      this.router.navigateByUrl(`profile`);
      return;
    }
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
    });

    if (this.activeRoute.snapshot.queryParams['company_id']) {
      this.company_id = this.activeRoute.snapshot.queryParams['company_id'];
    }
  }

  loading!: Boolean;
  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.login();
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  login() {
    this.loading = true;
    this.api.post_('auth/users', this.userForm.value).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.access_token && response.refresh_token) {
          this.auth.setLogin(response);

          if (this.company_id) {
            this.router.navigateByUrl(`scan/${this.company_id}`);
          } else {
            if (response.user.role_id == 1) {
              this.router.navigateByUrl(`dashboard`);
            } else {
              this.router.navigateByUrl(`user/attendances`);
            }
          }
        } else {
          this.fun.presentAlertError(response.message);
        }
      },
      (error) => {
        this.loading = false;
        this.fun.presentAlertError(
          error.error.message ||
            error.error.sqlMessage ||
            'Please check your Internet connection.'
        );
      }
    );
  }
}
