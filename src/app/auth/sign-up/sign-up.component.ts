import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { paths } from '../../app-routing.module';
import { MessageDialogComponent } from '../../shared/components/message-dialog/message-dialog.component';
import { AuthStore } from '../stores/auth.store';
import { MIN_PASSWORD_LENGTH } from '../../shared/constants/auth.constants';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  isLoading$: Observable<boolean>;

  signUpForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(MIN_PASSWORD_LENGTH),
    ]),
  });

  constructor(public dialog: MatDialog, private authStore: AuthStore) {
    this.isLoading$ = this.authStore.isLoading.value$;
  }

  ngOnInit(): void {
    this.authStore.error.value$.subscribe((error) => {
      if (error) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: error,
        });

        dialogRef.afterClosed().subscribe(() => {
          this.authStore.error.value = '';
        });
      }
    });
  }

  getLoginMessage() {
    return this.signUpForm.controls.login.hasError('required')
      ? 'You must enter a login'
      : '';
  }

  getPasswordMessage() {
    if (this.signUpForm.controls.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.signUpForm.controls.password.hasError('minlength')
      ? `Password length is less ${MIN_PASSWORD_LENGTH}`
      : '';
  }

  onSubmit(): void {
    const login = this.signUpForm.value.login;
    const password = this.signUpForm.value.password;

    if (this.signUpForm.valid && login && password) {
      this.authStore.signUp({ login, password });
    }
  }
}
