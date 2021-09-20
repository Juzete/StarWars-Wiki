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
        ...initialState,
        data: action.payload,
        [action.path]: dataSetLocation(action.payload, action.path),
      };

    case SHOW_MODAL:
    console.log(action.id)
    console.log(action.path)
    console.log(initialState[action.path][action.id - 1], 111)
      return {
        ...initialState,
        dataInstance: initialState[action.path][action.id - 1].item,
      };

    default:
      return state;
  }
}
