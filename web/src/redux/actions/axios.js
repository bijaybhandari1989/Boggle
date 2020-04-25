import axios from "axios";
const tokenProvider = require("axios-token-interceptor");

const instance = axios.create({
  baseURL: process.env.API_URL,
  responseType: "json",
});

instance.interceptors.request.use(
  tokenProvider({
    getToken: () => {
      let auth = JSON.parse(localStorage.getItem("currentUser"));
      if (auth && auth.auth_token.length > 0) {
        return auth.auth_token;
      }
      return "";
    },
  })
);
export default instance;
