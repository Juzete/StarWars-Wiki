import React from "react";
import { Link } from "react-router-dom";
import { useWikiSelector } from "../../store/utils";
import styles from "./ProfileButton.module.css";

export default function Profile() {
  const isAuth = useWikiSelector();
  return (
    <Link to="/" className={styles.button}>
      {isAuth.currentUser ? "Profile" : "Log In"}
    </Link>
  );
}
