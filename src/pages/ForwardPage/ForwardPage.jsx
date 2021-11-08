import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import EarthModel from '../../components/Models/EarthModel/EarthModel';
import ScrollingText from '../../components/Models/ScrollingText/ScrollingText';
import StarsModel from '../../components/Models/Stars/StarsModel';
import styles from './ForwardPage.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from 'react-js-loader';
import { Html, useProgress } from '@react-three/drei';

const Load = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

export const ForwardPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader
          type="spinner-default"
          bgColor={'#FFFFFF'}
          title={'Loading...'}
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
          <Suspense fallback={<Load />}>
            <EarthModel />
            <StarsModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ForwardPage