import styles from "./Modal.module.css";
import { PrintConditions } from "./printConditions";

const Modal = ({ type, id, visible, setVisible }) => {
  const rootClasses = [styles.modal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>{PrintConditions(type, id)}</div>
      </div>
    </div>
  );
};

export default Modal;
