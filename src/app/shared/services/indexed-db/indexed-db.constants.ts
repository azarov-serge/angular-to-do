import { StorageIndex } from '../../helpers/indexed-db-client/indexed-db.types';
import { StorageIndexName, StorageName } from './indexed-db.types';

export const ANGULAR_TO_DO_DB_NAME = 'angularToDo';
export const ANGULAR_TO_DO_DB_VERSION = 1;

export const storageNames: StorageName[] = ['auth', 'tasks'];

export const storeNameToIndexeses: Record<
  StorageName,
  StorageIndex<StorageIndexName>[]
> = {
  auth: [
    { index: 'authLogin', key: 'login' },
    { index: 'authIsLoggedIn', key: 'isLoggedIn' },
  ],
  tasks: [{ index: 'tasksUserId', key: 'userId' }],
};

export const indexedDbConfig = {
  dbName: ANGULAR_TO_DO_DB_NAME,
  dbVersion: ANGULAR_TO_DO_DB_VERSION,
  storageNames,
  storeNameToIndexeses,
};
