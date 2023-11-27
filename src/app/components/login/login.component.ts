import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  componentName(componentName: any) {
    throw new Error('Method not implemented.');
  }
  passwordHide: boolean = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login: any;

  constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.loginForm.valid) {
      //call to authService
      console.log(this.loginForm.value);
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.authService.setToken(res.token);
          this._snackBar.open(res.message, 'Close', { duration: 5000 });
          this.route.navigate(['dashboard']);
        },
        (err) => {
          console.log(err);
          this._snackBar.open(err.error.message, 'Close', { duration: 5000 });
        }
      );
    }
  }
}
