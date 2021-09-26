import { Button } from "react-bootstrap";
import React, { Suspense } from "react";
import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Canvas } from "@react-three/fiber";
import StarsModel from "./Models/Stars/StarsModel";
import Logo from "./Logo/Logo";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

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
          <div>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <div>
            <strong>Email:</strong> {currentUser.email}
          </div>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
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
