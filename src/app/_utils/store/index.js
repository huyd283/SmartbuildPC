import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import productReducer from "./product.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
