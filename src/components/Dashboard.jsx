import React, { Suspense } from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Canvas } from "@react-three/fiber";
import StarsModel from "./Models/Stars/StarsModel";
import Logo from "./Logo/Logo";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const information = useSelector((state) => state.wiki);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Logo />
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <div className={styles.avatar}>
            <img
              src={`https://avatars.dicebear.com/api/bottts/${information.currentUser.email}.svg`}
              alt="avatar"
            />
          </div>
          <div className={styles.email}>
            <strong>Email:</strong> {currentUser.email}
          </div>
          <div className={styles.logout}>
            <a variant="link" onClick={handleLogout}>
              Log Out
            </a>
          </div>
        </div>
        <div className={styles.stars}>
          <Canvas>
            <Suspense fallback={null}>
              <StarsModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}
