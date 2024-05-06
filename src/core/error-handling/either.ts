import type { Failure } from './failure';
import type { Success } from './success';

export type Either<F, S> = Failure<F, S> | Success<F, S>;
