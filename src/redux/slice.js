import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  // initialState: [{id: 1, taskData: "default-task", status: "todo"},
  //   {id: 2, taskData: "default-2", status: "progress"},
  //   {id: 2, taskData: "default-3", status: "done"}
  // ],
  initialState:{data: [{id: 1, taskData: "default-task", status: "todo"},
    {id: 2, taskData: "default-2", status: "progress"},
    {id: 2, taskData: "default-3", status: "done"}
  ]},
  reducers: {
    addTask: (state, action) => {
      // console.log(action.payload);
      state.data.push(action.payload);
    },
    deleteTask: (state, action) => {
      // return state.filter((task)=>state.id!=task.id);
    },
    updateTask: (state,action) =>{
    //  state.data.push(action.payload);
    state.data=action.payload
    }
  },
});

export default taskSlice.reducer;
export const { addTask, deleteTask, updateTask } = taskSlice.actions;
