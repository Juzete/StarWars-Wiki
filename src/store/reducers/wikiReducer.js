import { FETCH_DATA, SET_CURRENT_USER, SET_PAGINATION, SHOW_MODAL } from "../constants";
import { dataSetLocation } from "../utils";
const initialState = {
  currentUser: null,
  isLoading: false,
  nextPage: null,
  prevPage: null,
  data: [],
  people: [],
  planets: [],
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  dataInstance: {},
};


export default function wikiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...initialState,
        data: action.payload,
        [action.path]: dataSetLocation(initialState, action.payload, action.path),
      };

    case SHOW_MODAL:
      return {
        ...initialState,
        dataInstance: initialState[action.path][action.id - 1].item,
      };
    
    case SET_PAGINATION:
      return {
        ...initialState,
        nextPage: action.next,
        prevPage: action.prev,
      };

    case SET_CURRENT_USER:
      return {
        ...initialState,
        currentUser: action.currentUser,
      }
    default:
      return state;
  }
}
