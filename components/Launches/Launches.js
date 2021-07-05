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
const Launches = () => {
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

  const [launches, setLaunches] = useState();

  const handleFilterChange = (filterObj) => {
    setState({ ...state, filter: filterObj });
  };

  /**
   * Responsible for transforming the data from the launch and launchpad api's
   * into a usable and consistent format for the LaunchItem component
   */
  const _launchDataTransform = (launchResp, launchPads) => {
    const {
      flight_number: flightNumber,
      launch_success: missionFailed,
      launch_site: { site_name: launchSiteName, site_id: launchSiteId },
      links: {
        mission_patch: missionPatchLink,
        article_link: articleLink,
        video_link: videoLink,
        reddit_campaign: redditCampaignLink,
        reddit_launch: redditLaunchLink,
        reddit_media: redditMediaLink,
        presskit: pressKitLink,
      },
      rocket: { rocket_name: rocketName },
      payloads: [{ payload_id: payloadId }],
      launch_date_local: launchDate,
    } = launchResp;

    const resultObj = {
      rocketName,
      payloadId,
      launchDate,
      launchSiteName,
      launchSiteId,
      flightNumber,
      missionFailed,
      missionPatchLink,
      redditCampaignLink,
      redditLaunchLink,
      redditMediaLink,
      pressKitLink,
      articleLink,
      videoLink,
    };

    return resultObj;
  };

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
      filteredLaunches = launches.filter((l) => {
        const {
          rocketName,
          payloadId,
          flightNumber,
          launchDate,
          launchSiteId,
        } = l;

        if (
          keywords &&
          (rocketName.toLowerCase().includes(keywords) ||
            payloadId.toLowerCase().includes(keywords) ||
            keywords.includes(String(flightNumber)))
        ) {
          return l;
        }

        if (selectedLaunchPad?.value === launchSiteId) {
          return l;
        }

        if (selectedMinYear) {
          if (selectedMaxYear) {
            if (
              selectedMaxYear.value >= moment(launchDate).year() &&
              selectedMinYear.value <= moment(launchDate).year()
            ) {
              return l;
            }
          } else {
            if (selectedMinYear.value <= moment(launchDate).year()) {
              return l;
            }
          }
        }

        if (selectedMaxYear) {
          if (selectedMinYear) {
            if (
              selectedMaxYear.value >= moment(launchDate).year() &&
              selectedMinYear.value <= moment(launchDate).year()
            ) {
              return l;
            }
          } else {
            if (selectedMaxYear.value >= moment(launchDate).year()) {
              return l;
            }
          }
        }

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
      dropDownYears: [{ value: null, label: "Any" }, ...uniqueYearsArray],
    });
  };

  const getAllLaunches = async () => {
    const result = await axios.get("/api/launches");
    return result.data;
  };

  useEffect(() => {
    getAllLaunches().then((launches) => {
      const transformedLaunches = launches.map((l) =>
        _launchDataTransform(l, [])
      );

      setLaunches(transformedLaunches);

      setDropDownYearsValues(transformedLaunches);
    });
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