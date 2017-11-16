const NotEmptyValidation = {
  flag: 'error',
  message: 'Field should not be empty',
  validate: value => value !== '' && value !== undefined && value !== null,
};

export default NotEmptyValidation;
