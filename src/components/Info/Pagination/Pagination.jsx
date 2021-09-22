import React from "react";
import { useSelector } from "react-redux";
import styles from "./Pagination.module.css";

export default function Pagination({setUrl}) {
  const data = useSelector((state) => state.wiki);
  const prevPage = data.prevPage;
  const nextPage = data.nextPage;

  return (
    <div className={styles.wrapper}>
      {prevPage ? <button onClick={() => {setUrl(prevPage)}}>{"<"}</button> : null}
      {nextPage ? <button onClick={() => {setUrl(nextPage)
    console.log({nextPage})}}>{">"}</button> : null}
    </div>
  );
}
