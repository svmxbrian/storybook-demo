import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from '../Label';
import Input from '../Input';
import FormField from './FormField';

storiesOf('FormField', module)
  .addWithInfo(
    'With Numeric Validation',
    'FormField with Numeric Validation on Input field',
    () => (
      <FormField
        validations={[
          {
            validation: 'numeric',
          },
        ]}
      >
        <Label htmlFor="id">Label</Label>
        <Input />
      </FormField>
    ),
  )
  .addWithInfo(
    'With Both NotEmpty and Numeric Validations',
    'Validations are run in order in which they are passed in.',
    () => (
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
        <Input />
      </FormField>
    ),
  );
