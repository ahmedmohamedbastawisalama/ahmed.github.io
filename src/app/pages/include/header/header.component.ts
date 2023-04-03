import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile_dialog = 0;
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
