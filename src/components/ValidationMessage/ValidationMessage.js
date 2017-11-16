import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

const defaultProps = {
  children: [],
  className: '',
};
const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const ValidationMessage = props => {
  const classes = className(
    'ValidationMessage',
    {
      'ValidationMessage--error': props.type === 'error',
    },
    {
      'ValidationMessage--success': props.type === 'success',
    },
    {
      'ValidationMessage--warning': props.type === 'warning',
    },
    props.className,
  );

  return <div className={classes}>{props.children}</div>;
};

ValidationMessage.defaultProps = defaultProps;
ValidationMessage.propTypes = propTypes;

export default ValidationMessage;
