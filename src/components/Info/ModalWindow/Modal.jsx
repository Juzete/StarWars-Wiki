import Comments from "./Comments/Comments";
import styles from "./Modal.module.css";
import { PrintConditions } from "./printConditions";

const Modal = ({ type, id, visible, setVisible }) => {
  const rootClasses = [styles.modal];
  if (visible) {
    rootClasses.push(styles.active);
  }
  console.log({ id });

  return (
    <div
      className={rootClasses.join(" ")}
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
};

export default Modal;
