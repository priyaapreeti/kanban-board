import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  // initialState: [{id: 1, taskData: "default-task", status: "todo"},
  //   {id: 2, taskData: "default-2", status: "progress"},
  //   {id: 2, taskData: "default-3", status: "done"}
  // ], //use objects to initial states
  initialState: {
    data: [
      { id: 1, taskData: "GET", status: "todo" },
      { id: 2, taskData: "A", status: "progress" },
      { id: 3, taskData: "JOB", status: "done" },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      // console.log(action.payload);
      state.data.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((todo) => todo.id != action.payload);
    },
    updateTask: (state, action) => {
      //  state.data.push(action.payload);
      state.data = action.payload;
    },
  },
});

export default taskSlice.reducer;
export const { addTask, deleteTask, updateTask } = taskSlice.actions;
