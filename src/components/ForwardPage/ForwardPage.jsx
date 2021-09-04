import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import EarthModel from "../Models/EarthModel/EarthModel";
import ScrollingText from "../Models/ScrollingText/ScrollingText";
import StarsModel from "../Models/Stars/StarsModel";
import Logo from "../Logo/Logo";
import styles from "./ForwardPage.module.css";
import Navigation from "../Navigation/Navigation";

export default function ForwardPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.earthModelWrapper}>
        <Canvas>
          <Suspense fallback={null}>
            <EarthModel />
            <StarsModel />
          </Suspense>
        </Canvas>
      </div>
      <Logo />
        <Navigation />
      <div className={styles.srollTextWrapper}>
        <ScrollingText />
      </div>
    </div>
  );
}