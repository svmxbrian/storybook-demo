import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import ValidationMessage from '../ValidationMessage';
import Label from '../Label';

import { NotEmptyValidation, NumberValidation } from './Validations';

const defaultProps = {
  className: '',
  // Validations array are the array of passed in validation methods to be run
  validations: [],
  // state prop for formfield should be used for server side validation error
  status: null,
};
const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  validations: PropTypes.arrayOf(
    PropTypes.shape({
      // Name of input if only specific to one field, otherwise use all fields
      fieldname: PropTypes.string,
      // array of valid validations
      validation: PropTypes.string.isRequired,
    }),
  ),
  status: PropTypes.shape({
    flag: PropTypes.oneOf(['error', 'warning', 'success']).isRequired,
    message: PropTypes.string.isRequired,
    // index refers to which input index is invalid
    index: PropTypes.number,
  }),
};

class FormField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = props.status || { flag: 'none' };

    this.setUpValidations();
  }

  // Set up input children before mounting
  componentWillMount() {
    this.children = this.props.children;
    this.setUpInputChildren();
    // If no pre-set errors from 'state' prop, then run validations
  }

  // Run validations after all refs are loaded and mounted
  componentDidMount() {
    if (this.state.flag === 'none') {
      this.runValidations();
    }
  }

  setUpInputChildren() {
    const context = this;
    // childFields is used to keep track of the child input values
    this.childFields = [];
    // pass state prop to each child that is not Label or ValidationMessage
    this.children = React.Children.map(this.children, (child, index) => {
      if (child.type !== ValidationMessage && child.type !== Label) {
        // Only if state.index === index would there be a flag
        return React.cloneElement(child, {
          state: this.state.index === index ? this.state.flag : 'none',
          onChange: () => {
            context.runValidations();
          },
          ref: input => (this.childFields[index] = input),
        });
      }
      this.childFields[index] = null;
      return child;
    });
  }

  setUpValidations() {
    // convert validations from string to class
    this.validations = this.props.validations.map(curr => {
      switch (curr.validation) {
        case 'numeric': {
          return {
            // Append fieldname and validation
            ...curr,
            ...NumberValidation,
          };
        }
        case 'notempty': {
          return {
            ...curr,
            ...NotEmptyValidation,
          };
        }
        default: {
          // this is the structure of validation object to be consumed
          return {
            validation: 'default',
            flag: 'none',
            message: '',
            validate: () => true,
          };
        }
      }
    });
  }

  updateInputStates(index, flag) {
    this.childFields.forEach((field, i) => {
      if (!field) {
        return;
      }
      if (i === index) {
        field.setState({
          state: flag,
        });
      } else {
        field.setState({
          state: 'none',
        });
      }
    });
  }

  runValidations() {
    const { validations } = this;
    const childFields = this.childFields;
    for (let i = 0; i < childFields.length; i += 1) {
      const curr = childFields[i];
      if (curr) {
        const fieldIsValid = this.validateField(curr, validations, i);
        if (!fieldIsValid) {
          return;
        }
      }
    }
    // Refresh state to none if all fields are valid
    this.setState({ flag: 'none' });
    this.updateInputStates();
  }

  /**
   * Validates a field based on prop validations
   * @param  {Input} field       Input field to validateField
   * @param  {array of Objects} validations Validations to iterate
   * @return {boolean} return true if passes validations, otherwise false
   */
  validateField(field, validations, childIndex) {
    for (let i = 0; i < validations.length; i += 1) {
      const validation = validations[i];

      const { fieldname, flag, message, validate } = validation;

      // Match validation fieldname with field.props.name
      // if no fieldname specification, run on all fields

      if (
        ((fieldname && field.props.name === fieldname) || !fieldname) &&
        !validate.call(field, field.state.value)
      ) {
        this.setState({
          index: childIndex,
          flag,
          message,
        });
        this.updateInputStates(childIndex, flag);
        return false;
      }
    }
    return true;
  }

  render() {
    const state = this.state;
    const classes = className('FormField', this.props.className);
    const children = this.children;

    return (
      <div className={classes}>
        {/* Filter out the ValidationMessage if there is one */}
        {children.filter(child => {
          if (child.type === ValidationMessage) return false;
          return true;
        })}

        {/* Only show validationMessage on state.state exists */}
        {/* If provided, show provided ValidationMessage */}
        {state.flag !== 'none' &&
          children[children.length - 1].type === ValidationMessage &&
          children[children.length - 1]}

        {/* If no validationMessage is provided as last child, then create default */}
        {state.flag !== 'none' &&
          children[children.length - 1].type !== ValidationMessage && (
            <ValidationMessage type={state.type}>{state.message}</ValidationMessage>
          )}
      </div>
    );
  }
}

FormField.defaultProps = defaultProps;
FormField.propTypes = propTypes;

export default FormField;
