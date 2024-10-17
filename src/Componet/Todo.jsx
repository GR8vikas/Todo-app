import React, { useState } from "react";
import todo from "../assets/todo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const addItems = () => {
    if (!inputData) {
    } else if (inputData && !toggleSubmit) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, allInputItem]);
      setInputData("");
    }
  };
  const deleteItem = (index) => {
    const updatedItem = item.filter((elem) => {
      return index != elem.id;
    });
    setItem(updatedItem);
  };
  const editItem = (id) => {
    const updatedItem = item.find((elem) => {
      return elem.id == id;
    });
    setToggleSubmit(false);
    setInputData(updatedItem.name);
    setIsEditItem(id);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="tudo" />
            <figcaption>Add your list Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              name="addItem"
              placeholder="Add items ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            ) : (
              <i
                className="fa-regular fa-pen-to-square add-btn"
                onClick={addItems}
              ></i>
            )}
          </div>
          <div className="showItems">
            {/* <div className="eachItem">
              <h3>Apple</h3>
              <i className="fa-regular fa-trash-can add-btn"></i>
            </div> */}
            {item.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    {" "}
                    <i
                      className="fa-regular fa-pen-to-square add-btn"
                      onClick={() => {
                        editItem(elem.id);
                      }}
                    ></i>
                    <i
                      className="fa-regular fa-trash-can add-btn"
                      onClick={() => {
                        deleteItem(elem.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => setItem([])}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
