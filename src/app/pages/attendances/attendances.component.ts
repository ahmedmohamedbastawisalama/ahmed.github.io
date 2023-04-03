import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css'],
})
export class AttendancesComponent implements OnInit {
  loading: boolean | undefined;
  userForm: any;
  attedances: any = [];
  visits: any = [];
  selectedDate = this.fun.currentDateOnly();
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService,
    public activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getVisits();
  }

  getVisits() {
    this.loading = true;
    this.api.get(`visits/company/?date=${this.selectedDate}`).subscribe(
      (response: any) => {
        this.loading = false;
        this.visits = response;
        this.attedances = response;
      },
      () => {
        this.loading = false;
      }
    );
  }

  filter(e: any) {
    this.selectedDate = e.target.value;
    this.getVisits();
  }

  goMap(e: any) {
    window.open(`https://maps.google.com/?q=${e.latitude},${e.longitude}`);
  }
}
