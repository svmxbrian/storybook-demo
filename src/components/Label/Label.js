import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  htmlFor: PropTypes.string.isRequired,
  isInline: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  isInline: false,
  className: '',
};

const Label = props => {
  const classes = classNames({ 'label--inline': props.isInline }, props.className);

  return (
    <label htmlFor={props.htmlFor} className={classes}>
      {props.children}
    </label>
  );
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
