import { TextField, Button } from "@mui/material";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addTask, deleteTask, updateTask } from "./redux/slice";

function App() {
  const [val, setVal] = useState("");
  const [dropIndicator, setDropIndicator] = useState("");
  const dispatcher = useDispatch();
  const Alltasks = useSelector((state) => state.tasks.data);
  const tasksRenderer = (status) => {
    // console.log(Alltasks);
    return Alltasks.filter((task) => task.status === status).map((task) => (
      <div
        key={task.id}
        draggable
        onDragStart={(e) => handleDragStart(e, task.id)}
        onDragEnd={handleDragEnd}
        className="my-task"
      >
        {task.taskData}
        <Button onClick={()=>dispatcher(deleteTask(task.id))} variant="" className="cross"> X </Button>
      </div>
    ));
  };
  const detect = (e) => {
    if (e.key === "Enter") {
      dispatcher(
        addTask({ id: Alltasks.length + 1, taskData: val, status: "todo" })
      );
      setVal("");
      // console.log(Alltasks);
    }
  };
  const handleDragStart = (e, taskId) => {
    console.log("start");
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragEnd = (e) => {
    console.log("end");
    e.dataTransfer.clearData();
  };
  const handleOnDrop = (e, status) => {
    e.preventDefault();
    const taskID = e.dataTransfer.getData("text/plain");
    // console.log(Alltasks);
    // const newState = () => {
    //   return Alltasks.map((task) => {
    //     if (task.id === +taskID) {
    //       return { ...task, status };
    //     }
    //     return task;
    //   });
    // };
    const updatedTasks=Alltasks.map(task=>{if(task.id===+taskID){
      return {...task,status}
    }
    return task
  })
    console.log(updatedTasks);
    dispatcher(updateTask(updatedTasks));
  };

  const handleDragerr = (e) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };

  return (
    <div className="main-container">
      <TextField
        value={val}
        id="outlined-basic"
        label="Enter a Task"
        variant="outlined"
        onKeyDown={(e) => {
          detect(e);
        }}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      <div className="wrapper">
        <div
          className="container"
          style={{ backgroundColor: dropIndicator === "todo" ? "#a6aba7" : "" }}
          id="todo"
          onDrop={(e) => handleOnDrop(e, "todo")}
          onDragOver={handleDragerr}
        >
          <h2>To-do</h2>
          {tasksRenderer("todo")}
        </div>
        <div
          className="container"
          style={{
            backgroundColor: dropIndicator === "progress" ? "#a6aba7" : "",
          }}
          id="progress"
          onDrop={(e) => handleOnDrop(e, "progress")}
          onDragOver={handleDragerr}
        ><h2>In progress</h2>
          {tasksRenderer("progress")}
        </div>
        <div
          className="container"
          style={{ backgroundColor: dropIndicator === "done" ? "#a6aba7" : "" }}
          id="done"
          onDrop={(e) => handleOnDrop(e, "done")}
          onDragOver={handleDragerr}
        >
          <h2>Done</h2>
          {tasksRenderer("done")}
        </div>
      </div>
    </div>
  );
}

export default App;
