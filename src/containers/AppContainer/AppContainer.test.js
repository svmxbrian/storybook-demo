import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { AppContainer } from './AppContainer';

describe('AppContainer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
        <AppContainer />
    );
    expect(wrapper).toBeDefined();
  });

  it('calls sayHello from onSubmitHello', () => {
    const sayHello = jest.fn();
    const wrapper = shallow(<AppContainer sayHello={sayHello} />);
    wrapper.instance().onSubmitHello({ name: 'foo' });
    expect(sayHello.mock.calls.length).toEqual(1);
  });
});
