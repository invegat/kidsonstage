/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';

const validate = values => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'notes'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label} label={label} error={touched && error} {...input} {...custom} />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label} checked={input.value} onCheck={input.onChange} />
);

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    label={label}
    error={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
  />
);

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="firstName" component={renderTextField} label="First Name" />
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" />
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
      <div>
        <Field name="sex" component={RadioButtonGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field>
      </div>
      <div>
        <Field name="favoriteColor" component={renderSelectField} label="Favorite Color">
          <MenuItem value="ff0000" primaryText="Red" />
          <MenuItem value="00ff00" primaryText="Green" />
          <MenuItem value="0000ff" primaryText="Blue" />
        </Field>
      </div>
      <div>
        <Field name="employed" component={renderCheckbox} label="Employed" />
      </div>
      <div>
        <Field name="notes" component={renderTextField} label="Notes" multiLine rows={2} />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'materialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm);

// export default reduxForm({
//   form: 'signin',
//   fields: ['username', 'password'],
// })(SignIn)
