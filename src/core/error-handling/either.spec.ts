import { Either } from './either';
import { Failure, failure } from './failure';
import { Success, success } from './success';

function doSomething(shouldSuccess: boolean): Either<string, {}> {
  if (shouldSuccess) {
    return success('success');
  }

  return failure('error');
}

describe('Either Error Handling', () => {
  it('should return success', () => {
    const result = doSomething(true);

    expect(result).toEqual(
      expect.objectContaining({
        value: 'success',
      }),
    );
    expect(result).toBeInstanceOf(Success);
  });

  it('should return error', () => {
    const result = doSomething(false);

    expect(result).toEqual(
      expect.objectContaining({
        value: 'error',
      }),
    );
    expect(result).toBeInstanceOf(Failure);
  });
});
