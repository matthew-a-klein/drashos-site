import axios from "axios";

export const deleteCategory = (id: string) => {
  return axios
    .post("api/drashos/categories/delete/", {
      id: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
