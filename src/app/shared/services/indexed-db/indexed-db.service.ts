import { Injectable } from '@angular/core';

import { IndexedDbClient } from '../../helpers/indexed-db-client/indexed-db.client';
import { indexedDbConfig } from './indexed-db.constants';
import { StorageIndexName, StorageName } from './indexed-db.types';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService extends IndexedDbClient<
  StorageName,
  StorageIndexName
> {
  constructor() {
    super(indexedDbConfig);
  }
}
