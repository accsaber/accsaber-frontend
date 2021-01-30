import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StaffLoginService } from './staff-login.service';
import { Router } from '@angular/router';
import { setToken } from '../../../shared/utlis/global-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showError } from '../../../shared/utlis/snackbar-utils';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
})
export class StaffLoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private staffLoginService: StaffLoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  attemptLogin(): void {
    const user = this.loginForm.getRawValue();
    this.staffLoginService.attemptLogin(user.username, user.password).subscribe(
      (jwt) => {
        setToken(jwt);
        this.router.navigateByUrl('/staff');
      },
      () => {
        showError(this.snackBar, 'Login was not successful, please retry');
        this.loginForm.reset();
        this.loginForm.markAsUntouched();
      }
    );
  }
}
