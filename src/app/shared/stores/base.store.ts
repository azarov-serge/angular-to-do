import { Injectable } from '@angular/core';

import { BehaviorSubjectItem } from '../helpers/behavior-subject-item';

@Injectable({
  providedIn: 'root',
})
export class BaseStore<T extends Record<any, any>> {
  isLoading: BehaviorSubjectItem<boolean> = new BehaviorSubjectItem(false);
  data: BehaviorSubjectItem<T> = new BehaviorSubjectItem<T>({} as T);
  error: BehaviorSubjectItem<string> = new BehaviorSubjectItem('');
}
