import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { paths } from '../../app-routing.module';
import { TasksStore } from '../stores/tasks.store';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task | undefined;

  constructor(private router: Router, private tasksStore: TasksStore) {}

  ngOnInit() {}

  onTaskToggleChange(isDone: boolean, task: Task) {
    this.tasksStore.editTask({
      ...task,
      isDone,
    });
  }

  onDeleteTaskClick(task: Task) {
    this.tasksStore.deleteTask(task);
  }
}
