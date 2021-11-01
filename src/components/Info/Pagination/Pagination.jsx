import React from "react";
import { useWikiSelector } from "../../../store/utils";
import styles from "./Pagination.module.css";

export default function Pagination({ setUrl }) {
  const data = useWikiSelector();
  const prevPage = data.prevPage;
  const nextPage = data.nextPage;

  return (
    <div className={styles.wrapper}>
      {prevPage ? (
        <button
          onClick={() => {
            setUrl(prevPage);
          }}
        >
          {"<"}
        </button>
      ) : null}
      {nextPage ? (
        <button
          onClick={() => {
            setUrl(nextPage);
          }}
        >
          {">"}
        </button>
      ) : null}
    </div>
  );
}
