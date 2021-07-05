import React from "react";
import PropTypes from "prop-types";

import Button, { TYPES as BUTTON_TYPES } from "../Button";

import styles from "./footer.module.scss";

const Footer = ({ onBackToTopClick }) => (
  <footer>
    <div className={`layout-l ${styles.content}`}>
      <p className={styles.copyright}>Copyright © 2018 Space Savvy</p>
      <Button onClick={onBackToTopClick} type={BUTTON_TYPES.LINK}>
        Back to top
      </Button>
    </div>
  </footer>
);

Footer.propTypes = {
  onBackToTopClick: PropTypes.func,
};

Footer.defaultProps = {
  onBackToTopClick: () => {},
};

export default Footer;
