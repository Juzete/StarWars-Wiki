export const dataSetLocation = (initialState, payload, path) => {
  let newIndex = payload[0].url.match(/\d+/);
  if (Object.values(initialState[path]).includes(newIndex)) return;
  initialState[path] = payload.reduce((acc, item) => {
    newIndex = item.url.match(/\d+/);
    return [...acc, { id: newIndex[0], item: item }];
  }, initialState[path]);
  const result = initialState[path];
  console.log(result, "result");
  return result;
};

export const postComm = (initialState, path, id, comment, metaData) => {
  let commentsObj = initialState[path][id - 1].comments;
  let commentId = null;
  console.log(initialState[path][id - 1], 123123131);
  const tempArray = [];
  if (commentsObj) {
    commentsObj.forEach(item => {
      tempArray.push(item.id);
    }); 
    commentId = Math.max(...tempArray) + 1;
    let payload = {
      id: commentId,
      comment: comment,
      metaData: metaData,
    };
    commentsObj.push(payload);
  } else {
    let payload = {
      id: 1,
      comment: comment,
      metaData: metaData,
    };
    initialState[path][id - 1].comments = [];
    initialState[path][id - 1].comments.push(payload);
  }

  return initialState[path];
};
