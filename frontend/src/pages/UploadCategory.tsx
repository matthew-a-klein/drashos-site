import { ChangeEvent, useState } from "react";
import { ActionFunctionArgs, Form, useLoaderData } from "react-router-dom";
import { Category } from "../types/Category";
import { getCategories } from "../api-requests/getCategories";
import { uploadCategory } from "../api-requests/uploadCategory";

export const loader = () => {
  const categories = getCategories();
  return categories;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let subcategories: string[] = data.subcategories?.toString().split(",")!;
  if (subcategories[0] === "") {
    subcategories = [];
  }

  let supercategories: string[] = data.supercategories?.toString().split(",")!;
  if (supercategories[0] === "") {
    supercategories = [];
  }
  return uploadCategory(
    data.title.toString(),
    data.description!.toString(),
    subcategories,
    supercategories
  );
};

const UploadCategory = () => {
  const data = useLoaderData() as Category[];
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [supercategories, setSupercategories] = useState<string[]>([]);

  const handleSubcategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let newSubcategories = subcategories;
    const id = event.target.id;
    const index = newSubcategories.indexOf(id);
    if (index > -1) {
      newSubcategories.splice(index, 1);
    } else {
      newSubcategories.push(id);
    }
    setSubcategories(newSubcategories);
  };

  const handleSupercategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let newSupercategories = supercategories;
    const id = event.target.id;
    const index = newSupercategories.indexOf(id);
    if (index > -1) {
      newSupercategories.splice(index, 1);
    } else {
      newSupercategories.push(id);
    }
    setSupercategories(newSupercategories);
  };
  return (
    <div>
      <Form
        method="post"
        className="max-w-md mx-auto my-8 border-2 border-blue-600 p-8 rounded-lg text-center"
      >
        <div>
          <input
            className="border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            name="title"
            placeholder="Title"
          ></input>
        </div>
        <div>
          <input
            className="mt-8 border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            name="description"
            placeholder="Description"
          ></input>
        </div>
        <div className="mt-8">Subcategories</div>
        <div className=" mx-auto  border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {data.map((category) => (
            <div>
              {" "}
              <input
                key={category.id}
                type="checkbox"
                name={category.id}
                id={category.id}
                onChange={handleSubcategoriesInputChange}
              ></input>
              <label>{category.title}</label>
            </div>
          ))}
        </div>
        <div className="mt-8">Supercategories</div>
        <div className=" mx-auto border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {data.map((category) => (
            <div>
              {" "}
              <input
                key={category.id}
                type="checkbox"
                name={category.id}
                id={category.id}
                onChange={handleSupercategoriesInputChange}
              ></input>
              <label>{category.title}</label>
            </div>
          ))}
        </div>

        <input name="subcategories" value={subcategories} hidden readOnly />
        <input name="supercategories" value={supercategories} hidden readOnly />
        <button
          type="submit"
          className="py-2 px-4 bg-slate-300 mt-4 border-2 border-slate-400 rounded-md"
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default UploadCategory;
