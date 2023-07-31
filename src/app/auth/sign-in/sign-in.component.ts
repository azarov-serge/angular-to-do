import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthStore } from '../stores/auth.store';
import { paths } from '../../app-routing.module';
import { MessageDialogComponent } from '../../shared/components/message-dialog/message-dialog.component';
import { MIN_PASSWORD_LENGTH } from '../../shared/constants/auth.constants';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  isLoading$: Observable<boolean>;

  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
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
    return this.signInForm.controls.login.hasError('required')
      ? 'You must enter a login'
      : '';
  }

  getPasswordMessage() {
    if (this.signInForm.controls.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.signInForm.controls.password.hasError('minlength')
      ? `Password length is less ${MIN_PASSWORD_LENGTH}`
      : '';
  }

  onSubmit(): void {
    const login = this.signInForm.value.login;
    const password = this.signInForm.value.password;

    if (this.signInForm.valid && login && password) {
      this.authStore.signIn({ login, password });
    }
  }
}
