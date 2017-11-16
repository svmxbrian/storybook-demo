import React from 'react';
import { shallow } from 'enzyme';

import ValidationMessage from '../ValidationMessage';

describe('ValidationMessage', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ValidationMessage>This is a message</ValidationMessage>);

    expect(wrapper).toBeDefined();
  });

  it('renders class names with className props', () => {
    const mockClass = 'test-class';
    const component = shallow(<ValidationMessage className={mockClass}>Message</ValidationMessage>);
    expect(component.hasClass(mockClass)).toEqual(true);
  });
});
