import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('renders successfully, matches snapshot', () => {
    const component = shallow(<Button>Click me!</Button>);
    expect(component).toMatchSnapshot();
    expect(component.text()).toEqual('Click me!');
    expect(component.hasClass('btn')).toEqual(true);
  });

  it('renders without adding a classname for secondary (default)', () => {
    const component = shallow(<Button type="secondary">Secondary</Button>);
    expect(component.hasClass('btn--secondary')).toEqual(false);
  });

  it('fires onClick when clicked', () => {
    const func = jest.fn();
    const component = shallow(<Button onClick={func}>Click me!</Button>);
    expect(component.hasClass('btn--disabled')).toEqual(false);
    component.simulate('click');
    expect(func).toHaveBeenCalled();
  });

  it('does not fire onClick when disabled and clicked', () => {
    const func = jest.fn();
    const component = shallow(
      <Button onClick={func} isDisabled>
        Click me!
      </Button>,
    );
    component.simulate('click');
    expect(func).not.toHaveBeenCalled();
  });

  it('should have disabled class if disabled', () => {
    const component = shallow(<Button isDisabled>Click me!</Button>);

    expect(component.hasClass('btn--disabled')).toEqual(true);
  });

  it('should not have disabled class if not disabled', () => {
    const component = shallow(<Button>Click me!</Button>);

    expect(component.hasClass('btn--disabled')).toEqual(false);
  });

  it('should have appropriate type classes', () => {
    const component = shallow(<Button type="THIS IS INVALID">Click me!</Button>);
    expect(component.hasClass('btn--THIS IS INVALID')).toEqual(false);

    const typeClasses = Button.validTypes;
    typeClasses.forEach(val => {
      const temp = shallow(<Button type={val}>Click me!</Button>);
      expect(temp.hasClass(`btn--${val}`)).toEqual(val !== 'secondary');
    });
  });

  it('should have appropriate size classes', () => {
    const component = shallow(<Button size="THIS IS INVALID">Click me!</Button>);
    expect(component.hasClass('btn--THIS IS INVALID')).toEqual(false);

    const sizeClasses = Button.validSizes;
    sizeClasses.forEach(val => {
      const temp = shallow(<Button size={val}>Click me!</Button>);
      expect(temp.hasClass(`btn--${val}`)).toEqual(val !== 'normal');
    });
  });

  it('renders class names with className props', () => {
    const mockClass = 'test-class';
    const component = shallow(<Button className={mockClass}>Click here</Button>);
    expect(component.hasClass(mockClass)).toEqual(true);
  });
});
