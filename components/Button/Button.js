import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./button.module.scss";

/**
 * Currently we support 3 variations of the button
 * Primary is a standard looking button,
 * Link makes the button appear like a hyperlink
 * Icon renders an icon button, where the icon is
 * defined using the 'icon' prop
 */
export const TYPES = {
  PRIMARY: "PRIMARY",
  LINK: "LINK",
  ICON: "ICON",
};

/**
 * The base button component
 */
const Button = ({ onClick, type, icon, ariaLabel, title, children }) => {
  const classes = classNames({
    [styles["btn--primary"]]: type === TYPES.PRIMARY,
    [styles["btn--link"]]: type === TYPES.LINK,
    [styles["btn--icon"]]: type === TYPES.ICON,
  });

  let buttonProps = {
    onClick,
    className: classes,
  };

  /**
   * If the button is an icon button,
   * then we add necessary ax props and set the background
   * image to be the provided icon
   */
  if (type === TYPES.ICON) {
    buttonProps["aria-label"] = ariaLabel;
    buttonProps.title = title;
    buttonProps.style = {
      background: `url(${icon}) no-repeat`,
    };
  }

  return <button {...buttonProps}>{children ? children : null}</button>;
};

/**
 * Here we define a custom proptype check function to handle making certain props
 * required when using the ICON button type, but not required otherwise
 */
const iconButtonRequired = (props, propName, componentName) => {
  if (
    props["type"] === TYPES.ICON &&
    (props[propName] === undefined || typeof props[propName] !== "string")
  ) {
    return new Error(
      `Prop '${propName}' is required when using an Icon button`
    );
  }
};

Button.propTypes = {
  // function to call when button is clicked
  onClick: PropTypes.func,

  // the variant of button
  type: PropTypes.oneOf(Object.values(TYPES)),

  // path to icon for icon variant of button
  icon: iconButtonRequired,

  // for icon buttons, an aria label is required
  ariaLabel: iconButtonRequired,

  // for icon buttons a title is also required
  title: iconButtonRequired,

  // the child nodes to render within the button element
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
  type: TYPES.PRIMARY,
  icon: "",
  ariaLabel: "",
  title: "",
  children: null,
};

export default Button;
