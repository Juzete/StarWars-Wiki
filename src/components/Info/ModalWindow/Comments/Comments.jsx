import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postCommentAction } from "../../../../store/actions/wiki";
import styles from "./Comments.module.css"

export default function Comments({ path, id }) {
  const textInput = React.createRef();

  const [comment, setComment] = useState("");
  const [coords, setCoords] = useState({
      left: 0,
      top: 0,
  })
  const information = useSelector((state) => state.wiki);
  const dispatch = useDispatch();

  const printComments = () => {
    let month = null;
    let date = null;
    if (information[path][id - 1].comments)
     return information[path][id - 1].comments.map((item) => {
          if (item.metaData.time.getMonth() < 10)  month = `0${item.metaData.time.getMonth()}` 
          else month = null;
          if (item.metaData.time.getDate() < 10)  date = `0${item.metaData.time.getDate()}` 
          else date = null;
        return (
          <div key={item.id} className={styles.comment}>
            <p className={styles.meta}>{item.metaData.user.email} {""} 
            {item.metaData.time.getFullYear()}.{month || item.metaData.time.getMonth()}.{date || item.metaData.time.getDate()}</p>
            <p>{item.comment}</p>
          </div>
        );
      });
  };


  useEffect(() => {
      printComments();
  },)

  const input = () => {
    setComment(textInput.current.value);
  };

  const postComment = () => {
    const metaData = {
      time: new Date(),
      user: information.currentUser,
    };
    dispatch(postCommentAction(comment, metaData, path, id));
    textInput.current.value = "";
  };

  

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
      <button onClick={postComment}>Post comment</button>
    </div>
  );
}
