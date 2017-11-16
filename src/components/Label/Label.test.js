import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';

describe('Label', () => {
  it('renders label correctly', () => {
    const wrapper = shallow(<Label htmlFor="test">Dummy</Label>);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('.label--inline').length).toBe(0);
    expect(wrapper.find('label').text()).toBe('Dummy');
  });

  it('renders inline label correctly', () => {
    const wrapper = shallow(
      <Label isInline htmlFor="test">
        Dummy
      </Label>,
    );
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('.label--inline').length).toBe(1);
  });

  it('renders class names with className props', () => {
    const mockClass = 'test-class';
    const component = shallow(<Label className={mockClass} />);
    expect(component.hasClass(mockClass)).toEqual(true);
  });
});
