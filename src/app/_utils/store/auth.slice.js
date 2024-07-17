const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userAuth: null,
  jwtAuth: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    setJwtAuth: (state, action) => {
      state.jwtAuth = action.payload;
    },
    resetUserAuth: (state) => {
      state.userAuth = null;
      state.jwtAuth = null;
    },
  },
});
export const { setUserAuth, resetUserAuth, setJwtAuth } = authSlice.actions;
export default authSlice.reducer;
