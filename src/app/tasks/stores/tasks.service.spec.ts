import { TestBed } from '@angular/core/testing';

import { TasksStore } from './tasks.store';

describe('TasksStore', () => {
  let store: TasksStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(TasksStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
