import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products.slice";

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
