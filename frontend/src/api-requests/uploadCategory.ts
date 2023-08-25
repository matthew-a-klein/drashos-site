import axios from "axios";

export const uploadCategory = async (
  title: string,
  description: string,
  subcategories: string[],
  supercategories: string[]
) => {
  return axios
    .post("/api/drashos/categories/create/", {
      title: title,
      description: description,
      subcategories: subcategories,
      supercategories: supercategories,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
