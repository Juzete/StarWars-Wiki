import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./Info.module.css";
import Loader from "react-js-loader";
import Modal from "./ModalWindow/Modal";
import { fetchDataAction } from "../../store/actions/wiki";

export default function Info({ fetchPath }) {
  const dispatch = useDispatch();
  const information = useSelector((state) => state.wiki.data);
  const allData = useSelector((state) => state.wiki);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instanceUrl, setInstanceUrl] = useState("");
  const [type, setType] = useState();

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`https://swapi.dev/api/${fetchPath}/?format=json`);
      let data = await res.json();
      dispatch(fetchDataAction(data.results, fetchPath));
    }
    async function loadingFetch() {
      await fetchData();
      setLoading(false);
    }
    console.log(allData, "alldata");
    console.log(allData[fetchPath], "fetchPath");
    allData[fetchPath].length === 0 ? loadingFetch() : setLoading(false);
  }, []);

  const printLabelInfo = () => {
    return allData[fetchPath].map((item) => {
      return (
        <div
          onClick={(e) => {
            setShowModal(true);
            setInstanceUrl(e.target.getAttribute("url"));
            setType(e.target.getAttribute("type"));
          }}
          type={fetchPath}
          url={item.item.url}
          className={styles.infoItem}
          key={item.item.url}
        >
          {item.item.name ? (
            <p url={item.item.url} type={fetchPath}>
              {item.item.name}
            </p>
          ) : (
            <p url={item.item.url} type={fetchPath}>
              {item.item.title}
            </p>
          )}
        </div>
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
