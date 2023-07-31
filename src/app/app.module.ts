import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { AppFooterComponent } from './shared/components/app-footer/app-footer.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { IndexedDbService } from './shared/services/indexed-db/indexed-db.service';
import { onIndexDbInit } from './shared/services/indexed-db/indexed-db.utils';
import { MessageDialogComponent } from './shared/components/message-dialog/message-dialog.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskEditorComponent } from './tasks/task-editor/task-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent,
    MessageDialogComponent,
    TasksComponent,
    TaskComponent,
    TaskEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    IndexedDbService,
    {
      provide: APP_INITIALIZER,
      useFactory: onIndexDbInit,
      deps: [IndexedDbService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
