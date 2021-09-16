import { FETCH_DATA, SHOW_MODAL } from "../constants";

const initialState = {
  data: [],
  people: [],
  planets: [],
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  dataInstance: {},
};

const dataSetLocation = (payload, path) => {
  let newIndex = payload[0].url.match(/\d+/);
  if (Object.values(initialState[path]).includes(newIndex)) return;
  initialState[path] = payload.reduce((acc, item) => {
    newIndex = item.url.match(/\d+/);
    return [...acc, { id: newIndex[0], item: item }];
  }, initialState[path]);
  return initialState[path];
};

export default function wikiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        [action.path]: dataSetLocation(action.payload, action.path),
      };

    case SHOW_MODAL:
      return {
        ...state,
        dataInstance: action.payload,
      };

    default:
      return state;
  }
}
