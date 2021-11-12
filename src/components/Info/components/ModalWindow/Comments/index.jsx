import { child, get, getDatabase, onValue, ref, set } from '@firebase/database';
import React, { useEffect, useState } from 'react';
import { useWikiSelector } from '@store/utils';
import styles from './index.module.css';
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ path, id }) => {
  const textInput = React.createRef();

  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [commentsData, setCommentsData] = useState(null);
  const information = useWikiSelector();

  const printComments = () => {
    const commentsArray = [];
    if (commentsData) {
      for (let key in commentsData) {
        commentsArray.push(
          <div key={commentsData[key].metaData.time} className={styles.comment}>
            <p className={styles.meta}>
              <img
                src={`https://avatars.dicebear.com/api/bottts/${commentsData[key].metaData.userName}.svg`}
                alt="avatar"
                className={styles.avatar}
              />
              {commentsData[key].metaData.userName}
              {commentsData[key].metaData.time
                .replace(/-/g, '.')
                .replace('T', ' ')
                .slice(0, commentsData[key].metaData.time.length - 5)}
            </p>
            <hr />
            <p>{commentsData[key].comment}</p>
          </div>
        );
      }
    }
    return commentsArray;
  };

  useEffect(() => {
    printComments();
    const update = (snapshot) => {
      const data = snapshot.val();
      setCommentsData(data);
      setCommentId(uuidv4);
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

  const writeCommentDB = async () => {
    textInput.current.value = '';
    if (comment) {
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
  };

  return (
    <div className={styles.wrapper}>
      <h2>Comments: </h2>
      {printComments()}
      {information.currentUser ? (
        <>
          <p>Input your comment</p>{' '}
          <input
            type="text"
            onInput={input}
            ref={textInput}
            placeholder="Type a comment..."
            required
          />
          <button onClick={writeCommentDB}>Post comment</button>{' '}
        </>
      ) : null}
    </div>
  );
};

export default React.memo(Comments);
