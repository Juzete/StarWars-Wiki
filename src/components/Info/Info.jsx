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
  const allData = useSelector((state) => state.wiki);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instanceId, setInstanceId] = useState();
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
            setType(e.target.getAttribute("type"));
            setInstanceId(e.target.getAttribute("id"))
          }}
          type={fetchPath}
          id={item.id}
          className={styles.infoItem}
          key={item.id}
        >
          {item.item.name ? (
            <p id={item.id} type={fetchPath}>
              {item.item.name}
            </p>
          ) : (
            <p id={item.id} type={fetchPath}>
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
          id={instanceId}
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
