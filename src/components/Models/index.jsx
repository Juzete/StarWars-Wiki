import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./Models.module.css"
import EarthModel from "./EarthModel/EarthModel";
import StarsModel from "./Stars/StarsModel";
import ScrollingText from "./ScrollingText/ScrollingText";

const Models = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas>
        <Suspense fallback={null}>
          <StarsModel />
          {/* <ScrollingText /> */}
          <EarthModel/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default  Models;