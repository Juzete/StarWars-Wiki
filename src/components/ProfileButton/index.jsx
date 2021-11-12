import React from "react";
import { Link } from "react-router-dom";
import { useWikiSelector } from "@store/utils";
import styles from "./index.module.css";

const Profile = () => {
  const isAuth = useWikiSelector();
  return (
    <Link to="/" className={styles.button}>
      {isAuth.currentUser ? "Profile" : "Log In"}
    </Link>
  );
}

export default Profile;