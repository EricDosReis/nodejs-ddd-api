import { Slug } from './slug';

it('should create a new slug from text', () => {
  const slug = Slug.createFromText('An-example title -- ');

  expect(slug.value).toBe('an-example-title');
});
