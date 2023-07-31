export type StorageName = 'auth' | 'tasks';
export type AuthKey = 'login' | 'isLoggedIn';
export type TasksKey = 'userId';

export type StorageIndexName =
  | `auth${Capitalize<AuthKey>}`
  | `tasks${Capitalize<TasksKey>}`;
