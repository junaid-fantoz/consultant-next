import React, { useEffect, useState } from "react";
import axios from "axios";
import LaunchFilter from "../LaunchFilter";
import LaunchItem from "../LaunchItem";
import Loader from "../Loader/Loader";

import styles from "./launches.module.scss";
import moment from "moment";

/**
 * Launches component responsible for showing the filter component,
 * handling the fetching and filtering of the launch data and rendering
 * the launches that match the selected filters
 */
const Launches = ({ launches }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    filter: {
      minYear: null,
      maxYear: null,
      keywords: null,
      launchPad: null,
    },
    dropDownYears: [],
  });

  // const [launches, setLaunches] = useState();

  const handleFilterChange = (filterObj) => {
    setState({ ...state, filter: filterObj });
  };

  /**
   * Responsible for transforming the data from the launch and launchpad api's
   * into a usable and consistent format for the LaunchItem component
   */

  const isKeywordPresent = (keywords, rocketName, payloadId, flightNumber) => {
    if (rocketName.toLowerCase().includes(keywords) ||
      payloadId.toLowerCase().includes(keywords) ||
      keywords.includes(String(flightNumber))) {
      return true;
    }
    return false;
  }

  const checkMaxYear = (selectedMinYear, selectedMaxYear, launchDate) => {

    if (selectedMinYear) {
      if (
        selectedMaxYear.value >= moment(launchDate).year() &&
        selectedMinYear.value <= moment(launchDate).year()
      ) {
        return true;
      }
      return false;
    } else {
      if (selectedMaxYear.value >= moment(launchDate).year()) {
        return true;
      }
      return false;
    }

  }

  const checkMinYear = (selectedMinYear, selectedMaxYear, launchDate) => {

    if (selectedMaxYear) {
      if (
        selectedMaxYear.value >= moment(launchDate).year() &&
        selectedMinYear.value <= moment(launchDate).year()
      ) {
        return true;
      }
      return false;
    } else {
      if (selectedMinYear.value <= moment(launchDate).year()) {
        return true;
      }
      return false;
    }
  }



  const _renderLaunches = () => {
    const {
      filter: { keywords, selectedMinYear, selectedMaxYear, selectedLaunchPad },
    } = state;

    let filteredLaunches = [];

    if (
      keywords ||
      selectedMaxYear?.value ||
      selectedMinYear?.value ||
      selectedLaunchPad?.value
    ) {
      console.log('check value', selectedMaxYear, selectedMinYear, selectedLaunchPad);
      filteredLaunches = launches.filter((l) => {
        const {
          rocketName,
          payloadId,
          flightNumber,
          launchDate,
          launchSiteId,
        } = l;

        if ((!keywords || isKeywordPresent(keywords, rocketName, payloadId, flightNumber, launchDate)) && (!selectedLaunchPad || selectedLaunchPad?.value === launchSiteId) && (!selectedMaxYear || checkMaxYear(selectedMinYear, selectedMaxYear, launchDate)) && (!selectedMinYear || checkMinYear(selectedMinYear, selectedMaxYear, launchDate))) {
          return l;
        }

        // if ((selectedMinYear && selectedMinYear.value === '') || (selectedMaxYear && selectedMaxYear.value === '')) {
        //   if (!keywords || isKeywordPresent(keywords, rocketName, payloadId, flightNumber, launchDate) || (!selectedLaunchPad || selectedLaunchPad?.value === launchSiteId)) {
        //     return l;
        //   }
        // }

        return null;
      });
    } else {
      filteredLaunches = launches;
    }


    return (
      <>
        <div className={styles.summary}>
          <p>
            {filteredLaunches.length > 0
              ? `Showing ${filteredLaunches.length} Missions`
              : ""}
          </p>
        </div>
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map((l, index) => <LaunchItem {...l} key={index} />)
        ) : (
          <div className={styles.center}>
            <div className={styles.caption}>No Results Found</div>
          </div>
        )}
      </>
    );
  };

  const setDropDownYearsValues = (transformedLaunches) => {
    const dropDownYears = transformedLaunches.map(({ launchDate }) => {
      const year = moment(launchDate).year();
      return {
        label: year,
        value: year,
      };
    });

    const uniqueYearsArray = dropDownYears.filter((dropDownValue, index) => {
      const stringifyDropDown = JSON.stringify(dropDownValue);
      return (
        index ===
        dropDownYears.findIndex((obj) => {
          return JSON.stringify(obj) === stringifyDropDown;
        })
      );
    });

    setState({
      ...state,
      dropDownYears: [{ value: '', label: "Any" }, ...uniqueYearsArray],
    });
  };

  useEffect(() => {
    setDropDownYearsValues(launches);
  }, []);

  const { dropDownYears } = state;

  return (
    <section className={`${styles.launches} layout-l`}>
      <LaunchFilter
        onFilterChange={handleFilterChange}
        dropDownYears={dropDownYears}
      />
      {launches ? _renderLaunches() : <Loader />}
    </section>
  );
};

export default Launches;
