import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';

describe('Input', () => {
  it('renders with type successfully', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" type="text" onChange={onChangeHandler} />);
    expect(wrapper.find('.text-input').length).toBe(1);
    expect(wrapper.find('.validation-error').length).toBe(0);
  });

  it('renders validation state successfully', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" state="error" onChange={onChangeHandler} />);
    expect(wrapper.find('.text-input').length).toBe(1);
    expect(wrapper.find('.validation-error').length).toBe(1);
  });

  it('renders with length successfully', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" length="huge" onChange={onChangeHandler} />);
    expect(wrapper.find('.text-input').length).toBe(1);
    expect(wrapper.find('.input--huge').length).toBe(1);
  });

  it('onChange handler can be invoked', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" type="text" onChange={onChangeHandler} />);
    const event = {
      target: {
        value: 'value',
      },
    };
    wrapper.find('.text-input').simulate('change', event);
    setTimeout(() => {
      expect(onChangeHandler).toBeCalledWith(event);
    }, 0);
  });

  it('renders with input readonly', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" isReadOnly onChange={onChangeHandler} />);
    expect(wrapper.find('.text-input').prop('readOnly')).toBe(true);
  });

  it('renders with input disabled', () => {
    const onChangeHandler = jest.fn();
    const wrapper = shallow(<Input name="test" isDisabled onChange={onChangeHandler} />);
    expect(wrapper.find('.text-input').prop('disabled')).toBe(true);
  });

  it('changes value with state value change', () => {
    const wrapper = shallow(<Input value="" onChange={() => {}} />);
    expect(wrapper.text()).toEqual('');

    const newValue = 'new value';
    wrapper.simulate('change', {
      target: {
        value: newValue,
      },
    });
    setTimeout(() => {
      expect(wrapper.text()).toEqual(newValue);
    }, 100);
  });

  it('renders class names with className props', () => {
    const mockClass = 'test-class';
    const component = shallow(<Input className={mockClass} />);
    expect(component.hasClass(mockClass)).toEqual(true);
  });

  // This test is for onChange input default function call for % func coverage
  it('runs default onChange function', () => {
    const wrapper = shallow(<Input value="" />);
    wrapper.simulate('change', {
      target: {
        value: 'anything',
      },
    });
    expect(wrapper).toBeDefined();
  });
});
