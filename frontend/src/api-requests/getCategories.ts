import axios from "axios";

export const getCategories = async () => {
  return axios
    .get("api/drashos/categories/list-ids/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
