import React from "react";
import PropTypes from "prop-types";

import styles from "./text-input.module.scss";

/**
 * Renders a simple text field with label
 */
const TextInput = ({ value, label, onChange, placeholder, uid }) => (
  <div className={styles.textInput}>
    <label className={styles.label} htmlFor={uid}>
      {label}
    </label>
    <input
      id={uid}
      className={styles.field}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  </div>
);

TextInput.propTypes = {
  // the current value of the text input
  value: PropTypes.string,

  // the label for the text input
  label: PropTypes.string.isRequired,

  // the function that is called when the user
  // updates the text
  onChange: PropTypes.func,

  // what text should be shown in the placeholder
  placeholder: PropTypes.string,

  // a unique identifier for the input so that the label
  // can be tied to it
  uid: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  value: "",
  onChange: () => {},
  placeholder: "",
};

export default TextInput;
