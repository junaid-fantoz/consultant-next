import React from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className="container">
      <div className={styles.loader}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={`${styles.circle} ${styles.circle3}`}></div>
      </div>
      <div className={styles.center}>
        <div className={styles.caption}>We are almost there...</div>
      </div>
    </div>
  );
};

export default Loader;
