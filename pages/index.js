import React, { Component, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Launches from "../components/Launches";

/**
 * Base component for the application
 */
const App = ({ launches }) => {
  const [state, setState] = useState({ scrollHeight: 0 });

  const handleScrollClick = (scrollHeight) => {
    setState({
      scrollHeight,
    });

    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  };

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: state.scrollHeight,
      behavior: "smooth",
    });
  };

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

  return (
    <div className="App">
      <Header onScrollClick={handleScrollClick} />
      <main>
        {launches && (
          <Launches
            launches={launches.map((l) => _launchDataTransform(l, []))}
          />
        )}
      </main>
      <Footer onBackToTopClick={handleBackToTopClick} />
    </div>
  );
};

export async function getStaticProps(_) {
  // Writing server side logic, it's not realte to client side app
  const launches = require("./api/resources/launches.json");

  return {
    props: {
      launches,
    }, // will be passed to the page component as props
  };
}

export default App;
