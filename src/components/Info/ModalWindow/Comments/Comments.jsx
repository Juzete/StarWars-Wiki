import { child, get, getDatabase, onValue, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { database } from "../../../../firebase/firebase";
import { postCommentAction } from "../../../../store/actions/wiki";
import styles from "./Comments.module.css";

export default function Comments({ path, id }) {
  const textInput = React.createRef();

  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [commentsData, setCommentsData] = useState(null);
  const information = useSelector((state) => state.wiki);

  const printComments = () => {
    console.log({ commentsData });
    if (commentsData !== null) {
      return commentsData.map((item) => {
        return (
          <div key={item.metaData.time} className={styles.comment}>
            <img src={`https://avatars.dicebear.com/api/bottts/${item.metaData.userName}.svg`} alt="avatar" className={styles.avatar}/>
            <p className={styles.meta}>
              {item.metaData.userName}{" "}
              {item.metaData.time
                .replace(/-/g, " ")
                .replace("T", " ")
                .replace("Z", " ")}
            </p>
            <p>{item.comment}</p>{" "}
          </div>
        );
      });
    }
  };

  useEffect(() => {
    printComments();
    const update = (snapshot) => {
      const data = snapshot.val();
      setCommentsData(data);
      if (data) {
        const ids = Object.keys(data);
        setCommentId(Math.max(...ids, 0) + 1);
      } else setCommentId(1);
    };
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const commentsRef = ref(db, `comments/${path}/id${id}`);
    const unsub = onValue(commentsRef, update);
    get(child(dbRef, `comments/${path}/id${id}`)).then(update);
    return unsub;
  }, []);

  const input = () => {
    setComment(textInput.current.value);
  };

  async function writeCommentDB() {
    textInput.current.value = "";
    const db = getDatabase();
    console.log(information.currentUser);
    const metaData = {
      time: new Date().toISOString(),
      userName: information.currentUser.email,
    };
    await set(ref(db, `comments/${path}/id${id}/${commentId}`), {
      metaData: metaData,
      comment: comment,
    });
  }

  return (
    <div className={styles.wrapper}>
      <h2>Comments: </h2>
      {printComments()}

      <p>Input your comment</p>
      <input
        type="text"
        onInput={input}
        ref={textInput}
        placeholder="Type a comment..."
      />
      <button onClick={writeCommentDB}>Post comment</button>
    </div>
  );
}
