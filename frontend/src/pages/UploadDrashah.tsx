import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Form,
  useLoaderData,
} from "react-router-dom";
import createDrashah from "../api-requests/createDrashah";
import { ChangeEvent, useEffect, useState } from "react";
import { getCategories } from "../api-requests/getCategories";
import { Category } from "../types/Category";
import { fileToBase64 } from "../utils/fileToBase64";

export const loader = async ({}: LoaderFunctionArgs) => {
  const data = await getCategories();
  return data ? data : null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  let title: string = formData.get("title")!.toString();
  let description: string = formData.get("description")!.toString();
  let audio = formData.get("base64File")!.toString();
  let fileName = formData.get("fileName")!.toString();
  let categories: string[] = formData.get("categories")?.toString().split(",")!;
  if (categories[0] === "") {
    categories = [];
  }
  return createDrashah(title, description, categories, audio, fileName);
};

const UploadDrashah = () => {
  const data = useLoaderData() as Category[];
  const [base64File, setBase64File] = useState("");
  const [fileName, setFileName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    fileToBase64(file)
      .then((base64) => {
        if (typeof base64 === "string") {
          setBase64File(base64);
          setFileName(file.name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let newCategories = categories;
    const id = event.target.id;
    const index = newCategories.indexOf(id);
    if (index > -1) {
      newCategories.splice(index, 1);
    } else {
      newCategories.push(id);
    }
    setCategories(newCategories);
  };
  return (
    <div>
      <Form
        method="post"
        className="max-w-md mx-auto mt-8 border-2 border-blue-600 p-8 rounded-lg text-center"
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
        <div className=" mx-auto mt-8 border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {data.map((category) => (
            <div key={category.id}>
              {" "}
              <input
                key={category.id}
                type="checkbox"
                name={category.id}
                id={category.id}
                onChange={handleCategoriesInputChange}
              ></input>
              <label>{category.title}</label>
            </div>
          ))}
        </div>
        <div>
          <input
            className="mt-8 border-2 border-blue-100 p-2 rounded-md w-72"
            type="file"
            id="file"
            onChange={handleFileInputChange}
            name="file"
            placeholder="File"
          ></input>
        </div>
        <input name="base64File" value={base64File} hidden readOnly />
        <input name="fileName" value={fileName} hidden readOnly />
        <input name="categories" value={categories} hidden readOnly />
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

export default UploadDrashah;
