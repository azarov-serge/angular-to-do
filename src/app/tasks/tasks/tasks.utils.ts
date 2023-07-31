import { TasksSortState, TasksState } from './tasks.types';

export const filterTasks = (tasks: Task[], state: TasksState): Task[] => {
  if (!tasks.length || state === 'all') {
    return tasks;
  }

  if (state === 'active') {
    return tasks.filter((task) => !task.isDone);
  }

  return tasks.filter((task) => task.isDone);
};

export const sortTasks = (tasks: Task[], state: TasksSortState) => {
  return tasks.sort((a, b) =>
    state === 'ask'
      ? Number(a.createdAt) - Number(b.createdAt)
      : Number(b.createdAt) - Number(a.createdAt)
  );
};
