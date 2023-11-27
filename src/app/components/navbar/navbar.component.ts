import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.removeToken();
    this.router.navigate(['login']);
    this._snackBar.open('User Logged Out!!', 'Close', { duration: 5000 });
  }

  goToFavourites() {
    this.router.navigate(['bookmarks']);
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  goToOldNews() {
    this.router.navigate(['old-news']);
  }

  isFavRoute() {
    return this.router.url.includes('/favourites');
  }
}
