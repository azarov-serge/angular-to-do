import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IndexedDbService } from '../../shared/services/indexed-db/indexed-db.service';
import { AuthStore } from '../../auth/stores/auth.store';
import { BaseStore } from '../../shared/stores/base.store';
import { paths } from 'src/app/app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class TasksStore extends BaseStore<{ tasks: Record<string, Task> }> {
  constructor(
    private router: Router,
    private indexedDbService: IndexedDbService,
    private authStore: AuthStore
  ) {
    super();

    this.data.value.tasks = {};
  }

  public fetchTasks = async (): Promise<void> => {
    this.isLoading.value = true;

    const user = this.authStore.data.value.user;

    if (!user) {
      this.router.navigate([`/${paths.sinIn}`]);
    }

    const tasks = await this.indexedDbService.from('tasks').select<Task>({
      key: 'tasksUserId',
      value: user?.id || -1,
    });

    if (Array.isArray(tasks)) {
      this.data.value = {
        ...this.data.value,
        tasks: tasks.reduce((acc: Record<string, Task>, task) => {
          acc[task.id] = task;

          return acc;
        }, {}),
      };
    }

    this.isLoading.value = false;
  };

  public createTask = async (task: Omit<Task, 'id' | 'userId'>) => {
    this.isLoading.value = true;

    const user = this.authStore.data.value.user;

    if (!user) {
      this.router.navigate([`/${paths.sinIn}`]);
    }

    const newTask: Omit<Task, 'id'> = {
      ...task,
      userId: user?.id || -1,
    };

    const id = await this.indexedDbService
      .from('tasks')
      .insert<Omit<Task, 'id'>>(newTask);

    this.data.value = {
      ...this.data.value,
      tasks: {
        ...this.data.value.tasks,
        [id]: {
          ...newTask,
          id,
        },
      },
    };

    this.isLoading.value = false;
    this.router.navigate([`/${paths.tasks}`]);
  };

  public editTask = async (task: Task, isRedirectToTasks = false) => {
    this.isLoading.value = true;

    const user = this.authStore.data.value.user;

    if (!user) {
      this.router.navigate([`/${paths.sinIn}`]);
    }

    await this.indexedDbService.from('tasks').update<Task>(task);

    this.data.value = {
      ...this.data.value,
      tasks: {
        ...this.data.value.tasks,
        [task.id]: task,
      },
    };

    this.isLoading.value = false;

    if (isRedirectToTasks) {
      this.router.navigate([`/${paths.tasks}`]);
    }
  };

  public deleteTask = async (task: Task) => {
    this.isLoading.value = true;

    const user = this.authStore.data.value.user;

    if (!user) {
      this.router.navigate([`/${paths.sinIn}`]);
    }

    await this.indexedDbService
      .from('tasks')
      .delete({ key: 'id', value: task.id });

    const tasks = { ...this.data.value.tasks };

    delete tasks[task.id];

    this.data.value = {
      ...this.data.value,
      tasks,
    };

    this.isLoading.value = false;
  };
}
