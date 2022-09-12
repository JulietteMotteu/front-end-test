import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "productsStore",
  initialState: {
    products: null,
    productId: null,
  },
  reducers: {
    setProductsData: (state, { payload }) => {
      state.products = payload;
    },
    setSelectedProductId: (state, { payload }) => {
      state.productId = payload;
    },
  },
});

export const { setProductsData, setSelectedProductId } = productsSlice.actions;
export default productsSlice.reducer;
