import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean | undefined;
  url = environment.url;

  constructor(
    public auth: AuthService,
    private router: Router,
    private api: ApiService,
    public fun: FunctionsService,
  ) { }


  ngOnInit() {
  }


  downloadQR() {
    window.open(`${this.url}auth/user/download/${this.auth.user.company_id}.png`);
  }

  createQr() {
    this.loading = true;
    this.api.post(`authenticated/users/qr/`, {})
      .subscribe((response: any) => {
        this.loading = false;
        this.fun.presentAlert("QR created");
        this.ngOnInit();
      }, error => {
        this.loading = false;
        this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Please check your Internet connection.');
      });
  }

}