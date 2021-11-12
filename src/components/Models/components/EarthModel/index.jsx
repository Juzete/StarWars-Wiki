import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import EarthDayMap from '@src/assets/textures/8k_earth_daymap.jpg';
import EarthCloudsMap from '@src/assets/textures/8k_earth_clouds.jpg';
import EarthNormalMap from '@src/assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '@src/assets/textures/8k_earth_specular_map.jpg';

const EarthModel = (props) => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    cloudsRef.current.rotation.y = elapsedTime / 6;
    earthRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      {/* {<ambientLight intensity={1} />} */}
      <pointLight color="#f6f3ea" position={[5, 0, 5]} intensity={1} />
      <mesh ref={cloudsRef} scale={[2.5, 2.5, 2.5]} position={[0, -3, 0]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} scale={[2.5, 2.5, 2.5]} position={[0, -3, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
};

export default EarthModel;
