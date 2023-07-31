import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from './auth/stores/auth.store';
import { paths } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-to-do';
  isLoading: boolean = false;

  constructor(private router: Router, private authStore: AuthStore) {}

  ngOnInit(): void {
    this.authStore.data.value$.subscribe(({ user, isCheckAuth }) => {
      this.isLoading = isCheckAuth;

      if (user) {
        this.router.navigate([`/${paths.tasks}`]);
      } else {
        this.router.navigate([`/${paths.sinIn}`]);
      }
    });

    this.authStore.checkAuth();
  }
}
