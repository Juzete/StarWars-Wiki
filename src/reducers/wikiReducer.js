const FETCH_DATA = "FETCH_DATA";

const defaultState = {
  data: [],
  isFetching: true,
};

export default function wikiReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload
      }

    default:
      return state;
  }
}

export const fetchDataAction = (data) => ({type: FETCH_DATA, payload:data})
