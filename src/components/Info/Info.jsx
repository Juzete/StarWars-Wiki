import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction } from "../../reducers/wikiReducer";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./Info.module.css";
import Loader from "react-js-loader";
import Modal from "./ModalWindow/Modal";

export default function Info({ fetchPath }) {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.wiki.data);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instanceUrl, setInstanceUrl] = useState("");
  const [type, setType] = useState();

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
          <div
            onClick={(e) => {
              setShowModal(true);
              setInstanceUrl(e.target.getAttribute("url"));
              setType(e.target.getAttribute("type"));
              console.log();
            }}
            type={fetchPath}
            url={item.url}
            className={styles.infoItem}
            key={item.url}
          >
            {item.name ? (
              <p url={item.url} type={fetchPath}>
                {item.name}
              </p>
            ) : (
              <p url={item.url} type={fetchPath}>
                {item.title}
              </p>
            )}
          </div>
        </>
      );
    });
  };

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

      {showModal ? (
        <Modal
          type={type}
          url={instanceUrl}
          visible={showModal}
          setVisible={setShowModal}
        />
      ) : null}

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
