import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProductIds: [],
  selectedCategoryIds: [],
  totalPrice: 0,
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
    updateTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    updateSelectedCategoryIds: (state, action) => {
      state.selectedCategoryIds = action.payload;
    },
    decreTotalPrice: (state, action) => {
      state.totalPrice -= action.payload;
    },
    resetTotalPrice: (state) => {
      state.totalPrice = 0;
    },
  },
});

export const {
  setSelectedProduct,
  resetSelectedProduct,
  removeSelectedProduct,
  updateTotalPrice,
  resetTotalPrice,
  decreTotalPrice,
  updateSelectedCategoryIds,
} = productSlice.actions;
export default productSlice.reducer;
