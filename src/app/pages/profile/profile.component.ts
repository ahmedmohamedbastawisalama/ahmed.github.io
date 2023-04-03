import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean | undefined;
  user: any = {};
  roles: any = [];
  designations: any = [];
  userForm: any;
  activeTab = 1;
  user_id: number | undefined;
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      phone: [''],
      designation_id: [''],
      role_id: ['', Validators.required]
    });

    this.editAction(this.auth.user);
    this.getRoles();
    this.getDesignations();
  }

  getRoles() {
    this.roles = [
      {
        id : 1,
        title : "Admin"
      },
      {
        id : 2,
        title : "Staff"
      }
    ];
  }

  getDesignations() {
    this.loading = true;
    this.api.get(`designations/company`)
      .subscribe((response: any) => {
        this.loading = false;
        this.designations = response;
      }, () => {
        this.loading = false;
      });
  }

  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.update();
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  update() {
    this.loading = true;
    if (!this.userForm.value.password) {
      delete this.userForm.value.password;
    }
    this.api.put(`crud/users/${this.user_id}`, this.userForm.value)
      .subscribe((response: any) => {
        this.loading = false;
        this.fun.presentAlert("Information has been updated.");
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

  editAction(user: any) {
    this.user_id = user.id;
    this.userForm.get('name').setValue(user.name);
    this.userForm.get('email').setValue(user.email);
    this.userForm.get('phone').setValue(user.phone);
    this.userForm.get('designation_id').setValue(user.designation_id);
    this.userForm.get('role_id').setValue(user.role_id);
    this.userForm.markAsDirty();
  }

}