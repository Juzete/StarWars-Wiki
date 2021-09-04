import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import EarthModel from "../Models/EarthModel/EarthModel";
import ScrollingText from "../Models/ScrollingText/ScrollingText";
import StarsModel from "../Models/Stars/StarsModel";
import Logo from "../Logo/Logo";
import styles from "./ForwardPage.module.css";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-js-loader";

export default function ForwardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Logo />

      {loading ? <Loader
          type="spinner-default"
          bgColor={"#FFFFFF"}
          title={"Loading..."}
          size={100}
        /> : null}
      

      <div className={`${styles.earthModelWrapper}`}>
        <Canvas>
          <Suspense fallback={null}>
            <EarthModel />
            <StarsModel />
          </Suspense>
        </Canvas>
        <Canvas>
          <Suspense fallback={null}>
            <StarsModel />
          </Suspense>
        </Canvas>
      </div>
      <Navigation />
      <div className={styles.srollTextWrapper}>
        <ScrollingText />
      </div>
    </div>
  );
}
