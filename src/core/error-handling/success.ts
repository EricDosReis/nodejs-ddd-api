import type { Either } from './either';
import type { Failure } from './failure';

export class Success<F, S> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<F, S> {
    return true;
  }

  isFailure(): this is Failure<F, S> {
    return false;
  }
}

export const success = <F, S>(value: S): Either<F, S> => {
  return new Success(value);
};
