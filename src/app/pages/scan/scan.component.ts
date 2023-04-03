import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  loading: boolean | undefined;
  user: any = {};
  roles: any = [];
  designations: any = [];
  userForm: any;
  activeTab = 1;
  company_id: any;
  url = environment.url;
  data: any = {
    company_id: '',
    latitude: '',
    longitude: '',
  };
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    public activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.paramMap.get('company_id')) {
      this.data.company_id =
        this.activeRoute.snapshot.paramMap.get('company_id');

        if(!this.auth.is_login) {
          this.router.navigateByUrl(`/?company_id=${this.data.company_id}`);
        } else {
          this.getLocation();
        }
    }
  }

  async getLocation() {
    let el = this;
    el.loading = true;
    try {
      navigator.geolocation.getCurrentPosition(
        function (coordinates) {
          el.data.latitude = coordinates.coords.latitude;
          el.data.longitude = coordinates.coords.longitude;
          el.submit();
        },
        function () {
          el.loading = false;
          el.router.navigateByUrl('/user/attendances', { replaceUrl: true });
          el.fun.presentAlertError('Please enable geolocation and try again.');
        },
        { timeout: 10000 }
      );
    } catch (error) {
      el.loading = false;
    }
  }

  async submit() {
    if (!this.data.company_id) {
      this.loading = false;
      this.fun.presentAlert('Please provide your company.');
      return;
    }

    this.api.post(`visits`, this.data).subscribe(
      (response: any) => {
        this.loading = false;
        this.router.navigateByUrl('/user/attendances', { replaceUrl: true });
        this.fun.presentAlert('Done successfully.');
      },
      (error) => {
        this.loading = false;
        this.router.navigateByUrl('/user/attendances', { replaceUrl: true });
        this.fun.presentAlertError(
          error.error.message || 'Something wrong, Try again.'
        );
      }
    );
  }
}
