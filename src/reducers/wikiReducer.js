const FETCH_DATA = "FETCH_DATA";
const SHOW_MODAL = "SHOW_MODAL";

const defaultState = {
  data: [],
  dataInstance: {},
  isFetching: true,
};

export default function wikiReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload
      }

    case SHOW_MODAL:
      return {
        ...state,
        dataInstance: action.payload
      }

    default:
      return state;
  }
}

export const fetchDataAction = (data) => ({type: FETCH_DATA, payload:data})
export const showModalAction = (dataInstance) => ({type: SHOW_MODAL, payload:dataInstance})
