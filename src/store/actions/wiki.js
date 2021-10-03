import {
  FETCH_DATA,
  POST_COMMENT,
  SET_CURRENT_USER,
  SET_PAGINATION,
  SHOW_MODAL,
} from "../constants";

export const fetchDataAction = (data, path) => ({
  type: FETCH_DATA,
  payload: data,
  path: path,
});
export const showModalAction = (path, id) => ({
  type: SHOW_MODAL,
  path: path,
  id: id,
});
export const setPaginationAction = (prev, next) => ({
  type: SET_PAGINATION,
  prev: prev,
  next: next,
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
