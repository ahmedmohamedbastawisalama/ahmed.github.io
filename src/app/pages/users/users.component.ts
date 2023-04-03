import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loading: boolean | undefined;
  users: any = [];
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
    this.getUsers();
    this.getRoles();
    this.getDesignations();
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      gender: [''],
      password: [''],
      designation_id: [''],
      role_id: ['2', Validators.required]
    });
  }

  getUsers() {
    this.loading = true;
    this.api.get(`users/company`)
      .subscribe((response: any) => {
        this.loading = false;
        this.users = response;
      }, () => {
        this.loading = false;
      });
  }

  getRoles() {
    this.roles = [
      {
        id : 1,
        title : "Admin",
        description : "Can manage admin panel"
      },
      {
        id : 2,
        title : "Staff",
        description : "Only mark attendance using app"
      }
    ];
  }

  getDesignations() {
    this.loading = true;
    this.api.get(`designations/company/`)
      .subscribe((response: any) => {
        this.loading = false;
        this.designations = response;
      }, () => {
        this.loading = false;
      });
  }

  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user_id ? this.update() : this.save();
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  save() {

    if(!this.userForm.value.password) {
      this.fun.presentAlertError("Please enter the Password.");
      return;
    }

    this.loading = true;
    this.userForm.value.company_id = this.auth.user.company_id;
    this.api.post_(`auth/register/users`, this.userForm.value)
      .subscribe((response: any) => {
        this.loading = false;
        this.fun.presentAlert("Created Successfully.");
        this.getUsers();
        this.switchAction();
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

  update() {
    this.loading = true;
    if (!this.userForm.value.password) {
      delete this.userForm.value.password;
    }
    this.api.put(`crud/users/${this.user_id}`, this.userForm.value)
      .subscribe((response: any) => {
        this.loading = false;
        this.fun.presentAlert("Updated Successfully.");
        this.getUsers();
        this.switchAction();
      }, error => {
        this.loading = false;
        if (error.error.errno === 1062) {
          this.fun.presentAlertError("User with this email already exist.");
        } else {
          this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
        }
      });
  }

  switchAction() {
    this.user_id = 0;
    this.activeTab = this.activeTab == 1 ? 2 : 1;
    this.userForm.reset();
  }

  editAction(user: any) {
    this.switchAction();
    this.user_id = user._id;
    this.userForm.get('name').setValue(user.name);
    this.userForm.get('email').setValue(user.email);
    this.userForm.get('phone').setValue(user.phone);
    this.userForm.get('gender').setValue(user.gender);
    this.userForm.get('designation_id').setValue(user.designation_id);
    this.userForm.get('role_id').setValue(user.role_id);
    this.userForm.markAsDirty();
  }

  delete(id: number) {
    this.loading = true;
    this.api.delete(`crud/users/${id}`)
      .subscribe((response: any) => {
        this.loading = false;
        this.getUsers();
      }, error => {
        this.loading = false;
        if (error.error.errno === 1451) {
          this.fun.presentAlertError("User have attendance data.");
        } else {
          this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
        }
      });
  }

  deleteAction(designation: any) {
    let el = this;
    this.fun.presentConfirm(function (e) {
      if (e) {
        el.delete(designation._id);
      }
    }, "Confirm Delete");
  }
}