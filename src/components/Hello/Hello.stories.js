import React from 'react';
import { storiesOf } from '@storybook/react';
import Hello from './Hello';

storiesOf('Hello', module).addWithInfo(
  'Hello component type 1',
  'Hello component description',
  () => <Hello sayHello={() => {}} />,
);
