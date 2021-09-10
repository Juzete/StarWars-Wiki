import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction } from "../../reducers/wikiReducer";
import Logo from "../Logo/Logo";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./Info.module.css";
import Loader from "react-js-loader";

export default function Info({ fetchPath }) {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.wiki.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`https://swapi.dev/api/${fetchPath}/?format=json`);
      let data = await res.json();
      dispatch(fetchDataAction(data.results));
    }
    async function loadingFetch() {
      await fetchData();
      setLoading(false);
    }

    loadingFetch();
  }, []);

  const printLabelInfo = () => {
    return information.map((item) => {
      return (
        <>
          <div className={styles.infoItem}>
            {item.name ? <p>{item.name}</p> : <p>{item.title}</p>}
          </div>
        </>
      );
    });
  };

  console.log({ information });
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader
          type="spinner-default"
          bgColor={"#FFFFFF"}
          title={"Loading..."}
          size={100}
        />
      ) : (
        <div className={styles.infoWrapper}>{printLabelInfo()}</div>
      )}
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
