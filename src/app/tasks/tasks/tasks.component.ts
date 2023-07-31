import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksStore } from '../stores/tasks.store';
import { TasksSortState, TasksState } from './tasks.types';
import { filterTasks, sortTasks } from './tasks.utils';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  _tasks: Task[] = [];
  tasks: Task[] = [];

  tasksState: TasksState = 'active';
  tasksSortState: TasksSortState = 'ask';
  isLoading$: Observable<boolean>;

  constructor(private tasksStore: TasksStore) {
    this.isLoading$ = this.tasksStore.isLoading.value$;
  }

  ngOnInit(): void {
    this.tasksStore.fetchTasks();

    this.tasksStore.data.value$.subscribe(({ tasks }) => {
      this._tasks = Object.values(tasks);
      this.tasks = sortTasks(
        filterTasks(this._tasks, this.tasksState),
        this.tasksSortState
      );
    });
  }

  onStateClick(state: TasksState) {
    this.tasksState = state;
    this.tasks = sortTasks(
      filterTasks(this._tasks, this.tasksState),
      this.tasksSortState
    );
  }

  onSortStateClick() {
    this.tasksSortState = this.tasksSortState === 'ask' ? 'desk' : 'ask';
    this.tasks = sortTasks(
      filterTasks(this._tasks, this.tasksState),
      this.tasksSortState
    );
  }
}
