import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/type";

const Token = localStorage.getItem("token") ?? null;

if (Token) {
  axios.defaults.headers.common["Authorization"] = Token;
}

class ApiClient {
  get = (url, data) => {
    return axios.get(url, data);
  };
  create = (url, data) => {
    return axios.post(url, data);
  };
  delete = (url, data) => {
    return axios.delete(url, data);
  };
  put = (url, data) => {
    return axios.put(url, data);
  };
  patch = (url, data) => {
    return axios.patch(url, data);
  };
}
export { ApiClient };
