import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Logo = () => {
  return (
    <Link className={styles.logo} to="/forward">
      STAR WARS WIKI
    </Link>
  );
};

export default React.memo(Logo);