import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarsModel from "../Models/Stars/StarsModel";
import styles from "./Info.module.css";
import Loader from "react-js-loader";
import Modal from "./ModalWindow/Modal";
import { fetchDataAction, setPaginationAction } from "../../store/actions/wiki";
import Pagination from "./Pagination/Pagination";

export default function Info({ fetchPath }) {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.wiki);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instanceId, setInstanceId] = useState();
  const [type, setType] = useState();
  const defaultUrl = `https://swapi.dev/api/${fetchPath}/?format=json`;
  const [url, setUrl] = useState(defaultUrl);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(url);
      let data = await res.json();
      dispatch(fetchDataAction(data.results, fetchPath));
      dispatch(setPaginationAction(data.previous, data.next));
    }
    async function loadingFetch() {
      await fetchData();
      setLoading(false);
    }
    allData[fetchPath].length === 0 ? loadingFetch() : setLoading(false);
    if (url !== defaultUrl) loadingFetch();
  }, [url]);

  const scrollHandler = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop < 700 && allData.nextPage) {
      setUrl(allData.nextPage);
    }
  };

  const printLabelInfo = () => {
    return allData[fetchPath].map((item, index) => {
      return (
        <div
          onClick={(e) => {
            setShowModal(true);
            setType(e.target.getAttribute("type"));
            setInstanceId(e.target.getAttribute("id"));
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
        <div className={styles.infoWrapper} onScroll={(e) => scrollHandler(e)}>
          {printLabelInfo()}
        </div>
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
