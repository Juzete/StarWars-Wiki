import {
  FETCH_DATA,
  POST_COMMENT,
  SET_CURRENT_USER,
  SHOW_MODAL,
} from "../constants";

export const fetchDataAction = (data, path, nextPage) => ({
  type: FETCH_DATA,
  payload: data,
  path: path,
  nextPage: nextPage,
});
export const showModalAction = (path, id) => ({
  type: SHOW_MODAL,
  path: path,
  id: id,
});
export const setCurrentUserAction = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser: currentUser,
});
export const postCommentAction = (comment, metaData, path, id) => ({
  type: POST_COMMENT,
  comment: comment,
  metaData: metaData,
  path: path,
  id: id,
});
