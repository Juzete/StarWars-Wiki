import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./Models.module.css"
import EarthModel from "./EarthModel/EarthModel";

export default function Models() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas>
        <Suspense fallback={null}>
          <EarthModel/>
        </Suspense>
      </Canvas>
    </div>
  );
}
