import React, { useState, useEffect } from "react";
import "./Todoinput.css";

const getLocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todoinput = () => {
  const [text, setText] = useState(" ");
  const [task, setTask] = useState(getLocalItems());

  function handleInput(e) {
    setText(e.target.value);
  }

  function submitHandle(e) {
    e.preventDefault();
    setTask([...task, text]);
    setText("");
    console.log("submitted");
  }

  function removeTask(i) {
    const final = [...task];
    final.splice(i, 1);
    console.log(i);
    setTask(final);

    // const finaltask = task.filter((curr,ind)=>{
    //     return ind !== i

    // })
    // setTask(finaltask)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(task));
  }, [task]);

  function RemoveList() {
    const list = localStorage.getItem("list");
    console.log(list);
    if (list) {
      localStorage.removeItem("list");
      setTask([]);
    } else {
      console.log("No-items");
    }
  }

  return (
    <>
      <form className="todo-form" onSubmit={submitHandle}>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter Todo Items"
            onChange={handleInput}
            value={text}
          />
        </div>
        <div className="todo-button">
          <button type="submit">Add items</button>
        </div>
      </form>

      <div className="item-container">
        <div className="item-row1">
          {task.map((value, i) => {
            return (
              <>
                <div className="item-row">
                  <h5 key={i}>{value}</h5>
                  <button
                    onClick={() => {
                      removeTask(i);
                    }}
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => {
                      RemoveList();
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todoinput;
