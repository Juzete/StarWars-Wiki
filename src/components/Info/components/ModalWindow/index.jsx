import React from "react";
import Comments from "./Comments/";
import styles from "./index.module.css";
import { PrintConditions } from "./printConditions";

const Modal = React.memo(({ type, id, visible, setVisible }) => {
  const classNames = require("classnames/bind");
  if (visible) {
    const cx = classNames.bind(styles);
    var modalClasses = cx("active", styles.modal);
  }

  return (
    <div
      className={modalClasses}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <PrintConditions type={type} id={id} />
          <Comments path={type} id={id} />
        </div>
      </div>
    </div>
  );
});

export default Modal;
