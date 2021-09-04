import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link className={styles.logo} to="/forward">
      STAR WARS WIKI
    </Link>
  );
}
