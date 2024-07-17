const { default: axiosUrl } = require(".");
const { default: ROUTER_API } = require("../routes");
// create
export const registerUserAPI = async (data) => {
  try {
    const res = await axiosUrl.post(ROUTER_API.register, data);
    return res;
  } catch (error) {
    return error;
  }
};
// Sign In
export const signInAPI = async (data) => {
  try {
    const res = await axiosUrl.post(ROUTER_API.signIn, data);
    return res;
  } catch (error) {
    return error;
  }
};
