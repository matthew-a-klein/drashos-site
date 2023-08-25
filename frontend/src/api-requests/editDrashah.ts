import AxiosInstance from "../utils/AxiosInstance";

export const editDrashah = async (
  id: string,
  title: string,
  description: string,
  categories: string[],
  audio: string,
  fileName: string
) => {
  const axios = AxiosInstance;
  return axios
    .post(`/api/drashos/drashos/edit/${id}/`, {
      title: title,
      description: description,
      categories: categories,
      audio: audio,
      fileName: fileName,
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      return error;
    });
};
