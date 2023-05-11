import { ApiClient } from "./api_helper";
import * as url from "./url_helper";

const api = new ApiClient();

export const getUser = (data) => {
  return api.get(url.GET_USER);
};
export const postUser = (data) => {
  return api.create(url.GET_USER, data);
};
export const patchUser = (data) => {
  console.log("data: ", data.data);
  return api.patch(url.GET_USER + "/" + data?.id, data?.data);
};
export const deleteUser = (data) => {
  return api.delete(url.GET_USER + "/" + data);
};
