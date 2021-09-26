import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProfileButton.module.css";

export default function Profile() {
  const isAuth = useSelector((state) => state.wiki.currentUser);
  console.log({ isAuth });
  return (
    <Link to="/" className={styles.button}>
      {isAuth ? "Profile" : "Log In"}
    </Link>
  );
}
