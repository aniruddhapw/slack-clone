import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:9000",
  // baseURL: "https://slack-backend-uxfn.onrender.com",
  baseURL: "https://slack-backend-direct.onrender.com",
});
export default instance;
