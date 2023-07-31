import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TasksStore } from '../stores/tasks.store';

@Component({
  selector: 'task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css'],
})
export class TaskEditorComponent implements OnInit, OnDestroy {
  id: number = -1;
  private route$: any;

  isLoading$: Observable<boolean>;
  task: Task | null = null;

  editorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private tasksStore: TasksStore) {
    this.isLoading$ = this.tasksStore.isLoading.value$;
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const task = this.tasksStore.data.value.tasks[this.id];

      if (task) {
        this.task = task;
        this.editorForm.controls.name.setValue(task.name);
      }
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }

  getNameMessage() {
    return this.editorForm.controls.name.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  onSubmit(): void {
    if (!this.editorForm.valid) {
      return;
    }

    if (this.task) {
      this.tasksStore.editTask(
        {
          ...this.task,
          name: this.editorForm.value.name || '',
        },
        true
      );

      return;
    }

    this.tasksStore.createTask({
      name: this.editorForm.value.name || '',
      createdAt: new Date(),
      isDone: false,
    });
  }
}
