import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Modal.module.css";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import { printConditions } from "./printConditions";
import { showModalAction } from "../../../store/actions/wiki";

const Modal = ({ type, url, visible, setVisible }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const information = useSelector((state) => state.wiki.dataInstance);

  const rootClasses = [styles.modal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  async function fetchData() {
    let res = await fetch(url);
    let data = await res.json();
    dispatch(showModalAction(data));
  }

  const memoizedData = useCallback(() => fetchData(), [url]);

  useEffect(() => {
    async function loadingFetch() {
      await memoizedData();
      setLoading(false);
    }

    loadingFetch();
  }, []);

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <Loader
            type="spinner-default"
            bgColor={"#FFFFFF"}
            title={"Loading..."}
            size={100}
          />
        ) : (
          <div>{printConditions(type, information)}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
