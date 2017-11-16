import React from 'react';
import { shallow, mount } from 'enzyme';

import FormField from './FormField';
import Label from '../Label';
import Input from '../Input';
import ValidationMessage from '../ValidationMessage';

import { NotEmptyValidation, NumberValidation } from './Validations';

describe('FormField', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <FormField>
        <div />
        <div />
      </FormField>,
    );
    expect(wrapper).toBeDefined();
  });

  it('should have invalid state if isValid false state is passed in', () => {
    const wrapper = shallow(
      <FormField
        status={{
          isValid: false,
          flag: 'error',
          message: 'message',
        }}
      >
        <div />
        <div />
      </FormField>,
    );
    setTimeout(() => {
      expect(wrapper.state('type')).toEqual('error');
    }, 100);
  });

  it("should have 'none' state if validation is not passed in", () => {
    const wrapper = shallow(
      <FormField>
        <div />
        <div />
      </FormField>,
    );

    setTimeout(() => {
      expect(wrapper.state('type')).toEqual('none');
    }, 0);
  });

  it('should pass state error to its children that are not Label or ValidationMessage if not valid', () => {
    // Use mount here to render children as well
    const wrapper = mount(
      <FormField
        validation={{
          flag: 'error',
          message: 'default',
        }}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
        <ValidationMessage type="error">default</ValidationMessage>
      </FormField>,
    );
    setTimeout(() => {
      expect(wrapper.find('input').prop('state')).toEqual('error');
      expect(wrapper.find('.ValidationMessage').prop('state')).not.toBeDefined();
      expect(wrapper.find('label').prop('state')).not.toBeDefined();
    }, 100);
  });

  it('should only show validation message if state is not none', () => {
    const wrapper = mount(
      <FormField>
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
        <ValidationMessage type="error">default</ValidationMessage>
      </FormField>,
    );

    expect(wrapper.find('.ValidationMessage').length).toBe(0);

    wrapper.setState({
      flag: 'error',
    });

    setTimeout(() => {
      expect(wrapper.find('.ValidationMessage').length).toBe(1);
    }, 100);
  });

  it('should give default validation message if none is provided', () => {
    const wrapper = mount(
      <FormField>
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
      </FormField>,
    );

    wrapper.setState({
      flag: 'error',
    });

    expect(wrapper.find('.ValidationMessage').length).toBe(1);
  });

  it('should run validations on only matched fieldname fields', () => {
    const temp = NumberValidation.validate;
    NumberValidation.validate = jest.fn().mockReturnValue(true);
    mount(
      <FormField
        validations={[
          {
            validation: 'numeric',
            fieldname: 'notname',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
      </FormField>,
    );
    expect(NumberValidation.validate.mock.calls.length).toEqual(0);

    mount(
      <FormField
        validations={[
          {
            validation: 'numeric',
            fieldname: 'name',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
      </FormField>,
    );
    expect(NumberValidation.validate.mock.calls.length).toEqual(1);
    NumberValidation.validate = temp;
  });

  it('runs validation on all fields if no specified fieldname on validation', () => {
    const temp = NumberValidation.validate;
    NumberValidation.validate = jest.fn().mockReturnValue(true);
    mount(
      <FormField
        validations={[
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" onChange={() => {}} />
        <Input />
        <Input name="name2" />
      </FormField>,
    );
    expect(NumberValidation.validate.mock.calls.length).toEqual(3);
    NumberValidation.validate = temp;
  });

  it('runs validations in sequential order and shows the first erroneous message', () => {
    const numTemp = NumberValidation.validate;
    const nonEmptyTemp = NotEmptyValidation.validate;
    NumberValidation.validate = jest.fn().mockReturnValue(false);
    NotEmptyValidation.validate = jest.fn().mockReturnValue(false);
    let wrapper = mount(
      <FormField
        validations={[
          {
            validation: 'notempty',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" />
      </FormField>,
    );

    expect(wrapper.find('.ValidationMessage').text()).toEqual(NotEmptyValidation.message);

    wrapper = mount(
      <FormField
        validations={[
          {
            validation: 'notempty',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" value="some value" name="name" />
      </FormField>,
    );

    setTimeout(() => {
      expect(wrapper.find('.ValidationMessage').text()).toEqual(NumberValidation.message);
    }, 100);

    NumberValidation.validate = numTemp;
    NotEmptyValidation.validate = nonEmptyTemp;
  });

  it('handles state coming in from props and displays validation message without calling validation methods', () => {
    const numTemp = NumberValidation.validate;
    const nonEmptyTemp = NotEmptyValidation.validate;
    NumberValidation.validate = jest.fn().mockReturnValue(false);
    NotEmptyValidation.validate = jest.fn().mockReturnValue(false);
    const errorMessage = 'error message';
    let wrapper = mount(
      <FormField
        status={{
          flag: 'error',
          message: errorMessage,
        }}
        validations={[
          {
            validation: 'notempty',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" value="some value" name="name" />
      </FormField>,
    );
    expect(wrapper.state('flag')).toEqual('error');
    expect(wrapper.find('.ValidationMessage').text()).toEqual(errorMessage);
    expect(NumberValidation.validate.mock.calls.length).toEqual(0);
    expect(NotEmptyValidation.validate.mock.calls.length).toEqual(0);

    const index = 1;
    wrapper = mount(
      <FormField
        status={{
          flag: 'error',
          message: errorMessage,
          // This one passes in the index of the erroreous field
          index,
        }}
        validations={[
          {
            validation: 'notempty',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" value="some value" name="name" />
      </FormField>,
    );
    expect(wrapper.state('flag')).toEqual('error');
    expect(wrapper.find('.ValidationMessage').text()).toEqual(errorMessage);
    expect(NumberValidation.validate.mock.calls.length).toEqual(0);
    expect(NotEmptyValidation.validate.mock.calls.length).toEqual(0);

    NumberValidation.validate = numTemp;
    NotEmptyValidation.validate = nonEmptyTemp;
  });

  it('should run validations on change', () => {
    const numTemp = NumberValidation.validate;
    const nonEmptyTemp = NotEmptyValidation.validate;
    NumberValidation.validate = jest.fn().mockReturnValue(true);
    NotEmptyValidation.validate = jest.fn().mockReturnValue(true);
    const wrapper = mount(
      <FormField
        validations={[
          {
            validation: 'notempty',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" />
      </FormField>,
    );

    expect(NumberValidation.validate.mock.calls.length).toEqual(1);
    expect(NotEmptyValidation.validate.mock.calls.length).toEqual(1);
    wrapper.find('input').simulate('change', {
      target: {
        value: 'change value',
      },
    });

    expect(NumberValidation.validate.mock.calls.length).toEqual(2);
    expect(NotEmptyValidation.validate.mock.calls.length).toEqual(2);

    NumberValidation.validate = numTemp;
    NotEmptyValidation.validate = nonEmptyTemp;
  });

  it('uses default validation if there is no valid match for validation string passed in', () => {
    const wrapper = mount(
      <FormField
        validations={[
          {
            validation: 'THIS DOES NOT MATCH ANYTHING',
          },
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input type="text" name="name" />
      </FormField>,
    );

    expect(wrapper).toBeDefined();
  });

  it('renders class names with className props', () => {
    const mockClass = 'test-class';
    const component = shallow(
      <FormField className={mockClass}>
        <div />
      </FormField>,
    );
    expect(component.hasClass(mockClass)).toEqual(true);
  });
});
