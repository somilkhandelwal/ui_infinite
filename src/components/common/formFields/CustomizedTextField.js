import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const CustomizedTextField = (props) => {
  const {
    input: {
      name, type, value, ...restInput
    }, label, required, meta: { error, touched, submitError }
  } = props;
  console.log(error, touched, submitError);

  return (
    <TextField
      fullWidth
      type={type}
      name={name}
      value={value}
      label={label}
      {...restInput}
      required={required}
      error={(error || submitError) && touched}
      helperText={(error || submitError) && touched ? error || submitError : undefined}
    />
  );
};

CustomizedTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.object.isRequired
};
CustomizedTextField.defaultProps = {
  label: undefined,
  required: false
};

export default CustomizedTextField;
