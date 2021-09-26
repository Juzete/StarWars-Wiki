import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import EarthModel from "../Models/EarthModel/EarthModel";
import ScrollingText from "../Models/ScrollingText/ScrollingText";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./ForwardPage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-js-loader";

export default function ForwardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader
          type="spinner-default"
          bgColor={"#FFFFFF"}
          title={"Loading..."}
          size={100}
          className={styles.loader}
        />
      ) : (
        <div className={styles.srollTextWrapper}>
          <ScrollingText />
        </div>
      )}

      <div className={`${styles.earthModelWrapper}`}>
        <Canvas>
          <Suspense fallback={null}>
            <EarthModel />
            <StarsModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
