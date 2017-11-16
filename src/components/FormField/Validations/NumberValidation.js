const NumberValidation = {
  flag: 'error',
  message: 'Field should be a number',
  validate: value => value !== null && value !== undefined && !isNaN(Number(value)),
};

export default NumberValidation;
