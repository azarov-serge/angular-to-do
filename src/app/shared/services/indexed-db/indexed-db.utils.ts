import { IndexedDbService } from './indexed-db.service';

export const onIndexDbInit = (
  indexDbService: IndexedDbService
): (() => Promise<void>) => {
  return indexDbService.init;
};
