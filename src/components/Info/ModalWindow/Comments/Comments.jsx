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
  const information = useSelector((state) => state.wiki);
  const dispatch = useDispatch();

  // const printComments = () => {
  //   let month = null;
  //   let date = null;
  //   if (information[path][id - 1].comments)
  //     return information[path][id - 1].comments.map((item) => {
  //       if (item.metaData.time.getMonth() < 10)
  //         month = `0${item.metaData.time.getMonth()}`;
  //       else month = null;
  //       if (item.metaData.time.getDate() < 10)
  //         date = `0${item.metaData.time.getDate()}`;
  //       else date = null;
  //       return (
  //         <div key={item.id} className={styles.comment}>
  //           <p className={styles.meta}>
  //             {item.metaData.user.email} {""}
  //             {item.metaData.time.getFullYear()}.
  //             {month || item.metaData.time.getMonth()}.
  //             {date || item.metaData.time.getDate()}
  //           </p>
  //           <p>{item.comment}</p>
  //         </div>
  //       );
  //     });
  // };

  const printComments = () => {
    let month = null;
    let date = null;
    const db = getDatabase();
    const commentsRef = ref(db, `comments/${path}/id${id}`);
    const update = (snapshot) => {
      const data = snapshot.val();
      if (data) {
      return data.map((item) => {
          return (
          <div key={item.metaData.time} className={styles.comment}>
          <p className={styles.meta}>
            {item.metaData.userName} {""}
            {/* {item.metaData.time.getFullYear()}.
            {month || item.metaData.time.getMonth()}.
            {date || item.metaData.time.getDate()} */}
          </p>
          <p>{item.comment}</p>
        </div> 
          )
        })
      }
    }
    onValue(commentsRef, update);
    
  };

  useEffect(() => {
    printComments();
    const update = (snapshot) => {
      const data = snapshot.val();
      console.log(data, "data*");
      if (data) {
        const ids = Object.keys(data);
        setCommentId(Math.max(...ids, 0) + 1);
      } else setCommentId(1);
      
    }
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const commentsRef = ref(db, `comments/${path}/id${id}`);
    const unsub = onValue(commentsRef, update);
    get(child(dbRef, `comments/${path}/id${id}`)).then(update)
    return unsub;
  }, []);

  const input = () => {
    setComment(textInput.current.value);
  };

  // async function postComm(path, id) {
  //   const db = getDatabase();
  //   const dbRef = ref(getDatabase());
  //   const tempArray = [];
  //   const commentsRef = ref(db, `comments/${path}/id${id}`);
  //   const update = (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data, "data*");
  //     if (data) {
  //       const ids = Object.keys(data);
  //       setCommentId(Math.max(...ids, 0) + 1);
  //     } else setCommentId(1);
  //   }
  //   onValue(commentsRef, update);
  //   get(child(dbRef, `comments/${path}/id${id}`)).then(update)
  //   console.log({tempArray})
    // get(child(dbRef, `comments/${path}/id${id}`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //       commentsObj = snapshot.val();
    //     } else {
    //       console.log("No data available");
    //       setCommentId(1);
    //       console.log({ commentId });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // if (commentsObj) {
    //   commentsObj.forEach((item) => {
    //     tempArray.push(item.id);
    //   });
    //   commentId = Math.max(...tempArray) + 1;
    //   let payload = {
    //     id: commentId,
    //     comment: comment,
    //     metaData: metaData,
    //   };
    //   commentsObj.push(payload);
    // } else {
    //   let payload = {
    //     id: 1,
    //     comment: comment,
    //     metaData: metaData,
    //   };
    //   initialState[path][id - 1].comments = [];
    //   initialState[path][id - 1].comments.push(payload);
    // }
  // }

  async function writeCommentDB() {
    const db = getDatabase();
    console.log(information.currentUser);
    // await postComm(path, id);
    const metaData = {
      time: new Date().toISOString(),
      userName: information.currentUser.email,
    };
    await set(ref(db, `comments/${path}/id${id}/${commentId}`), {
      metaData: metaData,
      comment: comment,
    });
  }

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
      <button onClick={writeCommentDB}>Post comment</button>
    </div>
  );
}
