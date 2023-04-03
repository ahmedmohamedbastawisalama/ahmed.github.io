import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-user-attendances',
  templateUrl: './user-attendances.component.html',
  styleUrls: ['./user-attendances.component.css']
})
export class UserAttendancesComponent implements OnInit {
  loading: boolean | undefined;
  attedances: any = [];
  visits: any = [];
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    public activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myVisits();
  }

  async myVisits() {
    this.loading = true;

    this.api.get(`visits`).subscribe(
      (response: any) => {
        this.loading = false;

        this.visits = response;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  goMap(e: any) {
    window.open(`https://maps.google.com/?q=${e.latitude},${e.longitude}`);
  }
}
