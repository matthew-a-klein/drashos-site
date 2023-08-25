import axios from "axios";

export const getCategory = async (id: string) => {
  return axios
    .get(`api/drashos/categories/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
