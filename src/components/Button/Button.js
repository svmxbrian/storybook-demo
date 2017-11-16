import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const VALID_SIZES = ['normal', 'small', 'large'];
const VALID_TYPES = ['primary', 'secondary', 'tertiary', 'call-to-action', 'bare', 'bare--primary'];

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(VALID_SIZES),
  type: PropTypes.oneOf(VALID_TYPES),
  className: PropTypes.string,
};

const defaultProps = {
  isDisabled: false,
  size: 'normal',
  type: 'secondary',
  className: '',
};

function determineTypeClass(type) {
  return VALID_TYPES.indexOf(type) > -1 && type !== 'secondary' ? `btn--${type}` : '';
}

function determineSizeClass(size) {
  return VALID_SIZES.indexOf(size) > -1 && size !== 'normal' ? `btn--${size}` : '';
}

const Button = ({ type, size, children, isDisabled, onClick, className }) => {
  const classes = classNames(
    'btn',
    determineTypeClass(type),
    determineSizeClass(size),
    {
      'btn--disabled': isDisabled,
    },
    className,
  );

  return (
    <button onClick={isDisabled ? null : onClick} className={classes}>
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

Button.validSizes = VALID_SIZES;
Button.validTypes = VALID_TYPES;

export default Button;
