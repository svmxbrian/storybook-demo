import NotEmptyValidation from './NotEmptyValidation';

describe('NotEmptyValidation', () => {
  const validate = NotEmptyValidation.validate;
  it('validate should return true if value passed in is not empty string', () => {
    expect(validate('12321321')).toBeTruthy();
    expect(validate('abc')).toBeTruthy();
    expect(validate('-123-12-32--120d02')).toBeTruthy();
  });

  it('validate should return false if value is undefined, null, empty string', () => {
    expect(validate(undefined)).toBeFalsy();
    expect(validate(null)).toBeFalsy();
    expect(validate('')).toBeFalsy();
  });
});
