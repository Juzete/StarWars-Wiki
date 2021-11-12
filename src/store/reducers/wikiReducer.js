import {
  FETCH_DATA,
  POST_COMMENT,
  SET_CURRENT_USER,
  SHOW_MODAL,
} from '../constants';
import { dataSetLocation, postComm } from '../utils';

const initialState = {
  currentUser: null,
  isLoading: false,
  data: [],
  people: [],
  planets: [],
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  dataInstance: {},
  nextPage: null,
};

const wikiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        [action.path]: dataSetLocation(state, action.payload, action.path),
        nextPage: action.nextPage,
      };

    case SHOW_MODAL:
      let id = action.id - 1;
      return {
        ...state,
        dataInstance: state[action.path][id].item,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case POST_COMMENT:
      return {
        ...state,
        [action.path]: postComm(
          state,
          action.path,
          action.id,
          action.comment,
          action.metaData
        ),
      };

    default:
      return state;
  }
};

export default wikiReducer;
