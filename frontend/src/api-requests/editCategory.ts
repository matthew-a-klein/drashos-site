import axios from "axios";

export const editCategory = (
  id: string,
  title: string,
  description: string,
  subcategories: string[],
  supercategories: string[]
) => {
  return axios
    .post("api/drashos/categories/edit/", {
      id: id,
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
