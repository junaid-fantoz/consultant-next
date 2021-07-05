import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Image from "next/image";

import styles from "./launch-item.module.scss";

/**
 * Launch Item renders all the details of a
 * given launch
 */
const LaunchItem = ({
  rocketName,
  payloadId,
  launchDate,
  launchSiteName,
  flightNumber,
  missionFailed,
  missionPatchLink: imageUrl,
  redditCampaignLink,
  redditLaunchLink,
  redditMediaLink,
  pressKitLink,
  articleLink,
  videoLink,
}) => {
  const [date, time] = moment(launchDate)
    .format("MMMM Do YYYY, h:mma")
    .split(",");

  const LINKS = [
    { link: redditCampaignLink, label: "Reddit Campaign" },
    { link: redditLaunchLink, label: "Reddit Launch" },
    { link: redditMediaLink, label: "Reddit Media" },
    { link: pressKitLink, label: "Press Kit" },
    { link: articleLink, label: "Article" },
    { link: videoLink, label: "Watch Video" },
  ];

  return (
    <article className={styles.launchItem}>
      <div className={styles.patchContainer}>
        <Image
          src={imageUrl}
          className={styles.patch}
          alt="Mission patch"
          width="200"
          height="200"
        />
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.title}>
          {rocketName} - {payloadId}
          {!missionFailed && (
            <span className={styles.failed}>- Failed Mission</span>
          )}
        </p>
        <p className={styles.subtitle}>
          Launched <strong>{date}</strong> at <strong>{time}</strong> from{" "}
          <strong>{launchSiteName}</strong>
        </p>
        <div className={styles.links}>
          {LINKS.map(
            ({ link, label }) =>
              link && (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {label}
                </a>
              )
          )}
        </div>
      </div>
      <dl className={styles.flightNumber}>
        <dt>Flight Number</dt>
        <dd>{flightNumber}</dd>
      </dl>
    </article>
  );
};

LaunchItem.propTypes = {
  // name of the rocket used
  rocketName: PropTypes.string,

  // payload id of rocket
  payloadId: PropTypes.string,

  // the date of launch
  launchDate: PropTypes.string,

  // the launch pad the mission launched from
  launchSiteName: PropTypes.string,

  // flight number of the rocket
  flightNumber: PropTypes.string,

  // whether the mission failed or not defined,
  // as when the launch or landing was not successful
  missionFailed: PropTypes.string,

  // link to the mission patch image
  missionPatchLink: PropTypes.string,

  // link to the reddit campaign
  redditCampaignLink: PropTypes.string,

  // link to the reddit launch thread
  redditLaunchLink: PropTypes.string,

  // link to the reddit media thread
  redditMediaLink: PropTypes.string,

  // link to the press kit page
  pressKitLink: PropTypes.string,

  // link to the launch article page
  articleLink: PropTypes.string,

  // link to video of the mission
  videoLink: PropTypes.string,
};

export default LaunchItem;
