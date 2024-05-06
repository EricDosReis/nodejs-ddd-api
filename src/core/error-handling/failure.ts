import type { Either } from './either';
import type { Success } from './success';

export class Failure<F, S> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isFailure(): this is Failure<F, S> {
    return true;
  }

  isSuccess(): this is Success<F, S> {
    return false;
  }
}

export const failure = <F, S>(value: F): Either<F, S> => {
  return new Failure(value);
};
