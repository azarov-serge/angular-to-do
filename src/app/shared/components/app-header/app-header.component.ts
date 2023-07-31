import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from '../../../auth/stores/auth.store';
import { TasksStore } from '../../../tasks/stores/tasks.store';
import { paths } from '../../../app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['app-header.component.css'],
})
export class AppHeaderComponent {
  user: User | null = null;

  constructor(private router: Router, private authStore: AuthStore) {
    this.authStore.data.value$.subscribe(({ user }) => {
      this.user = user;
    });
  }

  onTasksClick(): void {
    this.router.navigate([`/${paths.tasks}`]);
  }

  onAddTaskClick(): void {
    this.router.navigate([`/${paths.createTask}`]);
  }

  onSignOutClick(): void {
    this.authStore.signOut();
  }
}
