export {};

declare global {
  type Id = number;

  interface User {
    id: Id;
    login: string;
    createdAt: Date;
  }

  interface AuthData extends User {
    password: string;
    isLoggedIn: 0 | 1;
  }

  interface Task {
    id: Id;
    name: string;
    isDone: boolean;
    createdAt: Date;
    userId: Id;
  }
}
