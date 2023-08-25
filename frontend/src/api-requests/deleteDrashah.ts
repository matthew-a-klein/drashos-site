import AxiosInstance from "../utils/AxiosInstance";

export const deleteDrashah = async (id: string) => {
  const axios = AxiosInstance;
  return axios
    .post(`/api/drashos/drashos/delete/${id}/`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error;
    });
};
