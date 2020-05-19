import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
    
  }
}
