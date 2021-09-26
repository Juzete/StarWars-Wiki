export const dataSetLocation = (initialState, payload, path) => {
  let newIndex = payload[0].url.match(/\d+/);
  if (Object.values(initialState[path]).includes(newIndex)) return;
  initialState[path] = payload.reduce((acc, item) => {
    newIndex = item.url.match(/\d+/);
    return [...acc, { id: newIndex[0], item: item }];
  }, initialState[path]);
  const result = initialState[path];
  console.log(result, "result");
  return result;
};
