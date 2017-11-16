import NumberValidation from './NumberValidation';

describe('NumberValidation', () => {
  const validate = NumberValidation.validate;
  it('validate should return true if value passed in is a number', () => {
    expect(validate('12321321')).toBeTruthy();
    expect(validate('-11212')).toBeTruthy();
    expect(validate('-1202.12323')).toBeTruthy();
    expect(validate(0)).toBeTruthy();
    expect(validate('0')).toBeTruthy();
    expect(validate('')).toBeTruthy();
  });

  it('validate should return false if value is not a number', () => {
    expect(validate(undefined)).toBeFalsy();
    expect(validate(null)).toBeFalsy();
    expect(validate('12-212')).toBeFalsy();
    expect(validate('12- -123')).toBeFalsy();
    expect(validate('1.101.2')).toBeFalsy();
    expect(validate('---0')).toBeFalsy();
  });
});
