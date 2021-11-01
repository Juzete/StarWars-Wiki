import { useSelector } from "react-redux";
import {wikiSelector} from "../selectors/selectors"

export const dataSetLocation = (initialState, payload, path) => {
  initialState[path] = payload.reduce((acc, item) => {
    let newIndex = item.url.match(/\d+/);
    return [...acc, { id: newIndex[0], item: item }];
  }, initialState[path]);
  const result = initialState[path];
  return result;
};

export const postComm = (initialState, path, id, comment, metaData) => {
  let commentsObj = initialState[path][id - 1].comments;
  let commentId = null;
  if (commentsObj) {
    const tempArray = commentsObj.map(item => item.id);
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
    initialState[path][id - 1].comments = [payload];
  }

  return initialState[path];
};

export const useWikiSelector = () => useSelector(wikiSelector);