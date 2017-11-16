import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const VALID_LENGTHS = ['auto', 'tiny', 'small', 'regular', 'large', 'huge'];
const VALID_STATES = ['none', 'warning', 'error', 'success'];
const VALID_TYPES = ['text', 'email', 'tel', 'search', 'number', 'password'];

const propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(VALID_TYPES).isRequired,
  onChange: PropTypes.func,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  length: PropTypes.oneOf(VALID_LENGTHS),
  state: PropTypes.oneOf(VALID_STATES),
  className: PropTypes.string,
};

const defaultProps = {
  name: null,
  type: 'text',
  isReadOnly: false,
  isDisabled: false,
  value: '',
  onChange: () => {},
  placeholder: '',
  length: 'auto',
  state: 'none',
  className: '',
};

const determineLengthClass = length =>
  (VALID_LENGTHS.indexOf(length) > -1 && length !== 'auto' ? `input--${length}` : '');

const determineStateClass = state =>
  (VALID_STATES.indexOf(state) > -1 && state !== 'none' ? `validation-${state}` : '');

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      state: props.state,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // ensures only 1 rerender per validations check if needed
    if (this.state.value !== prevState.value) {
      this.props.onChange();
    }
  }

  onChange(event) {
    const newVal = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      value: newVal,
    }));
  }

  render() {
    const classes = classNames(
      'text-input',
      determineLengthClass(this.props.length),
      determineStateClass(this.state.state),
      this.props.className,
    );

    return (
      <input
        name={this.props.name}
        className={classes}
        onChange={event => {
          this.onChange(event);
        }}
        type={this.props.type}
        value={this.state.value}
        placeholder={this.props.placeholder}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

Input.validLengths = VALID_LENGTHS;
Input.validStates = VALID_STATES;
Input.validTypes = VALID_TYPES;

export default Input;
