import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

import "./select.module.scss";

const Select = ({ value, label, onChange, options, uid }) => {
  const customStyles = {
    control: (styles) => ({
      ...styles,
      marginTop: 15,
      color: "#5A6066",
      width: "250px",
      height: 42,
    }),

    menu: (styles) => ({
      ...styles,
      width: "100%",
    }),
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          marginLeft: 2,
          marginBottom: -5,
        }}
        htmlFor={uid}
      >
        {label}
      </label>
      <ReactSelect
        styles={customStyles}
        value={value}
        onChange={onChange}
        options={options}
        id={uid}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

const selectOptionType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.any,
});

Select.propTypes = {
  // the current selected option of the select
  value: selectOptionType,

  // the label for the select
  label: PropTypes.string.isRequired,

  // the function that is called when the user
  // updates the selected option
  onChange: PropTypes.func,

  // the options the user can select from
  options: PropTypes.arrayOf(selectOptionType),

  // a unique identifier for the select so that the label
  // can be tied to it
  uid: PropTypes.string.isRequired,
};

Select.defaultProps = {
  value: "",
  onChange: () => {},
};

export default Select;
