import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import deviceSlice from "./deviceSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        device: deviceSlice,
        loading: loadingReducer
    }
  })

