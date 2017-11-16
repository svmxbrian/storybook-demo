import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
  .addWithInfo('Text Button', 'This is a text Button', () => (
    <div>
      <Button>Standard Button</Button>
      <Button type="secondary">Secondary Button</Button>
    </div>
  ))
  .addWithInfo('Disabled Button', 'This is a disabled Button', () => (
    <Button isDisabled>Disabled Button</Button>
  ));
