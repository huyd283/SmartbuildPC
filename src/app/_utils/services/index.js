const { default: axios } = require("axios");
const axiosUrl = axios.create({
  baseURL: "http://localhost:1337/api",
});

export default axiosUrl;
