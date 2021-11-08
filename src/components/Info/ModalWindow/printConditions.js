import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showModalAction } from "../../../store/actions/wiki";
import { useWikiSelector } from "../../../store/utils";

export const PrintConditions = ({ type, id }) => {
  const information = useWikiSelector();
  const dispatch = useDispatch();
  const [objectToPrint, setObjectToPrint] = useState({});

  useEffect(() => {
    dispatch(showModalAction(type, id));
  }, []);

  useEffect(() => {
    loadObjectToPrint();
  }, [information.dataInstance]);

  async function fetchVal(value) {
    const res = await fetch(value);
    let data = await res.json();
    if (data.name) return data.name;
    else return data.title;
  }

  function printObject() {
    const listItems = [];
    for (const key in objectToPrint) {
      let field = key[0].toUpperCase() + key.slice(1);
      field = field.replace("_", " ");
      listItems.push(
        <div key={key}>
          <p>
            {field} :{" "}
            {objectToPrint[key].length > 0 ? objectToPrint[key] : "none"}
          </p>
        </div>
      );
    }
    return <div>{listItems}</div>;
  }

  async function loadObjectToPrint() {
    let tempObj = {};
    let tempArr = [];
    await Promise.all(
      Object.entries(information.dataInstance).map(async ([key, value]) => {
        if (Array.isArray(value)) {
          await Promise.all(
            value
              .map((element) => {
                if (
                  typeof element === "string" &&
                  key !== "url" &&
                  element.startsWith("http")
                ) {
                  return element;
                }
              })
              .filter(Boolean)
              .map((element) =>
                fetchVal(element, key).then((v) => tempArr.push(v, ", "))
              )
          );
          tempObj = { ...tempObj, [key]: tempArr };
          tempArr = [];
        } else if (
          typeof value === "string" &&
          key !== "url" &&
          value.startsWith("http")
        ) {
          await Promise.resolve(
            fetchVal(value, key).then(
              (v) => (tempObj = { ...tempObj, [key]: v })
            )
          );
        } else tempObj = { ...tempObj, [key]: value };
      })
    );
    setObjectToPrint(tempObj);
  }

  return <div>{printObject()}</div>;
};
