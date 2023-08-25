import axios from "axios";

export const getDrashah = async (id: string) => {
  return axios
    .get(`api/drashos/drashos/${id}/`)
    .then((response) => {
      const data = response.data;
      return {
        title: data.title,
        description: data.description,
        categories: data.category,
        audio: data.audio,
        id: data.id,
      };
    })
    .catch((error) => {
      return error.status;
    });
};
