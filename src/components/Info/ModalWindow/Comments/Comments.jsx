import { child, get, getDatabase, onValue, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Comments.module.css";

export default function Comments({ path, id }) {
  const textInput = React.createRef();

  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [commentsData, setCommentsData] = useState(null);
  const information = useSelector((state) => state.wiki);
  const isAuth = useSelector((state) => state.wiki.currentUser);

  const printComments = () => {
    if (commentsData !== null) {
      return commentsData.map((item) => {
        return (
          <div key={item.metaData.time} className={styles.comment}>
            <p className={styles.meta}>
              <img
                src={`https://avatars.dicebear.com/api/bottts/${item.metaData.userName}.svg`}
                alt="avatar"
                className={styles.avatar}
              />
              {item.metaData.userName}{" "}
              {item.metaData.time
                .replace(/-/g, ".")
                .replace("T", " ")
                .replace("Z", " ")
                .slice(0, [item.metaData.time.length - 5])}
            </p>
            <hr />
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

      {isAuth ? (
        <>
          <p>Input your comment</p>
            {" "}
            <input
              type="text"
              onInput={input}
              ref={textInput}
              placeholder="Type a comment..."
            />
            <button onClick={writeCommentDB}>Post comment</button>{" "}
        </>
      ) : null}
    </div>
  );
}
