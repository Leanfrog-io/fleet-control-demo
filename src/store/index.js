import { configureStore } from "@reduxjs/toolkit";
import agvsReducer from "./agvsSlice";

export default configureStore({
  reducer: {
    agvs: agvsReducer,
  },
});
