import AxiosInstance from "../utils/AxiosInstance";

const createDrashah = async (
  title: string,
  description: string,
  categories: string[],
  audio: string,
  fileName: string
) => {
  const axios = AxiosInstance;
  return axios
    .post("api/drashos/drashos/create/", {
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
      return error.status;
    });
};

export default createDrashah;
