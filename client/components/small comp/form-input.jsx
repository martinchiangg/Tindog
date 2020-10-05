import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, multiline, ...otherProps }) => (
  <div className="input-div">
    {!multiline ? (
      <input className="form-input" onChange={handleChange} {...otherProps} />
    ) : (
      <textarea
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        rows={3}
      />
    )}
    {/* <input className="form-input" onChange={handleChange} {...otherProps} /> */}
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
