import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api.service';
import { FunctionsService } from './services/functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  current_route = "";
  constructor(
    public auth: AuthService,
    public router: Router,
    public api: ApiService,
    public fun: FunctionsService
  ) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.current_route = e.url;
      }
    });

    if (this.auth.getAccessToken()) {
      this.getUser(this.auth.getAccessToken());
    }

  }

  loading = false;
  getUser(e: string | null) {
    this.loading = true;
    this.api.post_('auth/access-token/users', {
      access_token: e
    })
      .subscribe((response: any) => {
        this.loading = false;
        this.auth.setUser(response);
      }, error => {
        this.loading = false;
        this.auth.logout();
        this.router.navigateByUrl('/');
      });
  }
}