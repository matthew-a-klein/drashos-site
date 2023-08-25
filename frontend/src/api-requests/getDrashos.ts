import axios from "axios";

export const getDrashos = async () => {
  return axios
    .get("api/drashos/drashosids/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
