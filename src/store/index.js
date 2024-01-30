import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

export default configureStore({
   reducer: {
      todos: slice,
   }
});