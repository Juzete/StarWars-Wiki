import { FETCH_DATA, SHOW_MODAL } from "../constants";

export const fetchDataAction = (data, path) => ({ type: FETCH_DATA, payload: data, path: path });
export const showModalAction = (dataInstance) => ({
  type: SHOW_MODAL,
  payload: dataInstance,
});


