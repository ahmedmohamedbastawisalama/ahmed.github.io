import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css'],
})
export class DesignationsComponent implements OnInit {
  loading: boolean | undefined;
  designations: any = [];
  userForm: any;
  activeTab = 1;
  designation_id: number | undefined;
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDesignation();
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  getDesignation() {
    this.loading = true;
    this.api.get(`designations/company`).subscribe(
      (response: any) => {
        this.loading = false;
        this.designations = response;
      },
      () => {
        this.loading = false;
      }
    );
  }

  submit() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.designation_id ? this.update() : this.save();
    } else {
      for (let i in this.userForm.controls)
        this.userForm.controls[i].markAsTouched();
    }
  }

  save() {
    this.loading = true;
    this.userForm.value.company_id = this.auth.user.company_id;
    this.api.post(`designations`, this.userForm.value).subscribe(
      (response: any) => {
        this.loading = false;
        this.fun.presentAlert('Created Successfully.');
        this.getDesignation();
        this.switchAction();
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

  update() {
    this.loading = true;
    this.api
      .put(`crud/designations/${this.designation_id}`, this.userForm.value)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.fun.presentAlert('Updated Successfully.');
          this.getDesignation();
          this.switchAction();
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

  delete(id: number) {
    this.loading = true;
    this.api.delete(`crud/designations/${id}`).subscribe(
      (response: any) => {
        this.loading = false;
        this.fun.presentAlert("Deleted Successfully.");
        this.getDesignation();
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

  switchAction() {
    this.designation_id = 0;
    this.activeTab = this.activeTab == 1 ? 2 : 1;
    this.userForm.reset();
  }

  editAction(designation: any) {
    this.switchAction();
    this.designation_id = designation._id;
    this.userForm.get('title').setValue(designation.title);
    this.userForm.get('description').setValue(designation.description);
    this.userForm.markAsDirty();
  }

  deleteAction(designation: any) {
    let el = this;
    if (confirm('Confirm Delete')) {
      el.delete(designation._id);
    }
  }
}
