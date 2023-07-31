import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { TaskEditorComponent } from './tasks/task-editor/task-editor.component';
import { IsAuthguard } from './shared/guards/auth.guards';

export const paths = {
  sinIn: 'sign-in',
  signUp: 'sign-up',
  tasks: 'tasks',
  createTask: 'create-task',
  editTask: 'edit-task/:id',
} as const;

const routes: Routes = [
  { path: paths.sinIn, component: SignInComponent },
  { path: paths.signUp, component: SignUpComponent },
  {
    path: paths.tasks,
    component: TasksComponent,
    canActivate: [IsAuthguard],
  },
  {
    path: paths.createTask,
    component: TaskEditorComponent,
    canActivate: [IsAuthguard],
  },
  {
    path: paths.editTask,
    component: TaskEditorComponent,
    canActivate: [IsAuthguard],
  },
  { path: '', redirectTo: paths.sinIn, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
