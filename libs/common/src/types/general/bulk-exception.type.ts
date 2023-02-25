import { Throwable } from '@app/common/interfaces/error.interface';

export type BulkException<O> = {
  payload: O;
  error?: Throwable;
};
