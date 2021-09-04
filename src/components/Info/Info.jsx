import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction } from "../../reducers/wikiReducer";
import Logo from "../Logo/Logo";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./Info.module.css";

export default function Info({ fetchPath }) {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.wiki.data);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`https://swapi.dev/api/people/?format=json`);
      let data = await res.json();
      dispatch(fetchDataAction(data.results));
    }
    fetchData();
  }, []);

  const printInfoPeople = () => {
   return information.map((item) => {
      return (
        <>
          <div className={styles.infoItem}>
            <p>Name: {item.name}</p>
            <p>Height: {item.height}</p>
            <p>Mass: {item.mass}</p>
            <p>Hair color: {item.hair_color}</p>
            <p>Skin color: {item.skin_color}</p>
            <p>Eye color: {item.eye_color}</p>
            <p>Birth year: {item.birth_year}</p>
            <p>Gender: {item.gender}</p>
          </div>
        </>
      );
    })
  };

  console.log({ information });
  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.infoWrapper}>{printInfoPeople()}</div>
      <div className={styles.modelWrapper}>
        <Canvas>
          <Suspense fallback={null}>
            <StarsModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
