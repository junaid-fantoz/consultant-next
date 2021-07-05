import React from "react";
import PropTypes from "prop-types";

import Select from "../Select";
import TextInput from "../TextInput";
import Button, { TYPES as BUTTON_TYPES } from "../Button";
import styles from "./launch-filter.module.scss";
import axios from "axios";

/**
 * Launch filter holds the filter state and writes the changes to the filters
 * back up to the parent element on click of the apply button
 */
class LaunchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
      launchPad: null,
      minYear: null,
      maxYear: null,
      launchPadOptions: [],

      selectedMaxYear: null,
      selectedMinYear: null,
      selectedLaunchPad: null,
    };
  }

  // some change handlers ready for you
  handleKeywordChange = (value) => {
    this.setState({ keywords: value });
  };

  handleMinYearChange = (selectedOption) => {
    this.setState({
      selectedMinYear: selectedOption,
    });
  };

  handleMaxYearChange = (selectedOption) => {
    this.setState({
      selectedMaxYear: selectedOption,
    });
  };

  handleLaunchPadChange = (selectedOption) => {
    this.setState({ selectedLaunchPad: selectedOption });
  };

  // handler for calling the filter update
  handleFilterUpdate = () => {
    const { onFilterChange } = this.props;
    let { keywords, selectedMaxYear, selectedMinYear, selectedLaunchPad } =
      this.state;

    keywords = keywords.toLowerCase().trim();

    onFilterChange({
      keywords,
      selectedMaxYear,
      selectedMinYear,
      selectedLaunchPad,
    });
  };

  componentDidMount() {
    axios.get("/api/launchpads").then((result) =>
      this.setState({
        launchPadOptions: [
          { label: "Any", value: "", full_name: "Any" },
          ...result.data,
        ],
      })
    );
  }

  render() {
    const {
      keywords,
      launchPadOptions,
      selectedLaunchPad,
      selectedMaxYear,
      selectedMinYear,
    } = this.state;
    const { dropDownYears } = this.props;

    return (
      <section className={styles.launchFilter}>
        <TextInput
          placeholder="eg Falcon"
          label="Keywords"
          value={keywords}
          onChange={this.handleKeywordChange}
          uid="example-text-input"
        />
        <Select
          label="Launch Pad"
          value={selectedLaunchPad || launchPadOptions[0]}
          onChange={this.handleLaunchPadChange}
          options={launchPadOptions.map(({ id, full_name }) => ({
            label: full_name,
            value: id,
          }))}
          uid="example-select"
        />
        <Select
          label="Min Year"
          value={selectedMinYear || dropDownYears[0]}
          onChange={this.handleMinYearChange}
          options={dropDownYears}
          uid="example-select"
        />
        <Select
          label="Max Year"
          value={selectedMaxYear || dropDownYears[0]}
          onChange={this.handleMaxYearChange}
          options={dropDownYears}
          uid="example-select"
        />
        <Button onClick={this.handleFilterUpdate} type={BUTTON_TYPES.PRIMARY}>
          Apply
        </Button>
      </section>
    );
  }
}

LaunchFilter.propTypes = {
  // used to let parent component know about changes
  // to the filters
  onFilterChange: PropTypes.func,
  dropDownYears: PropTypes.array,
};

LaunchFilter.defaultProps = {
  onFilterChange: () => {},
};

export default LaunchFilter;
