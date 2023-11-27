import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from './confirmPassword.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: ConfirmPassword.confirmPassword }
  );

  constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      console.log(user);
      //call to authService
      this.authService.registerUser(user).subscribe(
        (res: any) => {
          this._snackBar.open(res.message, 'Close', { duration: 5000 });
          this.route.navigate(['login']);
        },
        (err) => {
          this._snackBar.open(err.error.message, 'Close', { duration: 4000 });
        }
      );
    }
  }
}
