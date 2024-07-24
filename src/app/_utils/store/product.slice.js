import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProductIds:  [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
        state.selectedProductIds.push(action.payload);
    },
    resetSelectedProduct: (state) => {
      state.selectedProductIds = null;
    },
    removeSelectedProduct: (state, action) => {
        state.selectedProductIds = state.selectedProductIds.filter(
          (id) => id !== action.payload
        );
    },
  },
});

export const { setSelectedProduct, resetSelectedProduct, removeSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
