import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slice";

const myStore=configureStore({
    reducer: {
        tasks: taskSlice
    }
});
export default myStore;