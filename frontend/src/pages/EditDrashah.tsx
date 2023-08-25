import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  useLoaderData,
  useSubmit,
  useParams,
  Form,
} from "react-router-dom";
import { getDrashah } from "../api-requests/getDrashah";
import { getCategories } from "../api-requests/getCategories";
import { EditDrashahLoaderData } from "../types/LoaderDataTypes/EditDrashahLoaderData";
import { ChangeEvent, useEffect, useState } from "react";
import { fileToBase64 } from "../utils/fileToBase64";
import { editDrashah } from "../api-requests/editDrashah";
import PopupModal from "../components/PopupModal";
import DeleteDrashahConfirm from "../components/DeleteDrashahConfirm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const drashahData = await getDrashah(params.id!);

  const categoryData = await getCategories();
  if (drashahData && categoryData) {
    const data = {
      drashahData: drashahData,
      categoryData: categoryData,
    };

    return data;
  }
  return null;
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let categories: string[] = data.categories?.toString().split(",")!;
  if (categories[0] === "") {
    categories = [];
  }

  return await editDrashah(
    params.id!,
    data.title!.toString(),
    data.description!.toString(),
    categories,
    data.base64File!.toString(),
    data.fileName!.toString()
  );
};

const EditDrashah = () => {
  const submit = useSubmit();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const toggleDeleteConfirmOpen = () => {
    setDeleteConfirmOpen(!deleteConfirmOpen);
  };

  let { categoryData, drashahData } = useLoaderData() as EditDrashahLoaderData;
  const [base64File, setBase64File] = useState("");
  const { id } = useParams();
  const [fileName, setFileName] = useState("");

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

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
        console.log(error);
      });
  };

  const handleCategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let newCategories = formData.categories;

    const id = event.target.name;
    const index = newCategories.indexOf(id);
    if (index > -1) {
      newCategories.splice(index, 1);
    } else {
      newCategories.push(id);
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ["categories"]: newCategories,
      };
    });
  };

  useEffect(() => {
    setFormData({
      title: drashahData.title,
      description: drashahData.description,
      categories: drashahData.categories,
    });
  }, [drashahData]);

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    title: drashahData.title,
    description: drashahData.description,
    categories: drashahData.categories,
  });

  const handleSubmit = () => {
    submit(
      {
        title: formData.title,
        description: formData.description,
        categories: formData.categories,
        base64File: base64File,
        fileName: fileName,
      },
      {
        method: "post",
        action: `/editdrashos/${id}`,
      }
    );
  };

  return (
    <div>
      <Form
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="max-w-md mx-auto mt-8 border-2 border-blue-600 p-8 rounded-lg text-center"
      >
        <div>
          <input
            className="border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleTextInputChange}
            value={formData.title}
          ></input>
        </div>
        <div>
          <input
            className="mt-8 border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            onChange={handleTextInputChange}
            name="description"
            placeholder="Description"
            value={formData.description}
          ></input>
        </div>
        <div className=" mx-auto mt-8 border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {categoryData.map((category) => (
            <div key={category.id}>
              {" "}
              <input
                type="checkbox"
                name={category.id}
                value={category.id}
                checked={formData.categories.includes(category.id)}
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

        <button
          type="submit"
          className="py-2 px-4 bg-slate-300 mt-4 border-2 border-slate-400 rounded-md"
        >
          Update
        </button>
        <div>
          <button
            type="button"
            className="h-6 w-36 mt-6 bg-red-600 rounded-md border-2 border-red-900"
            onClick={() => {
              toggleDeleteConfirmOpen();
            }}
          >
            Delete
          </button>
        </div>
      </Form>

      <PopupModal
        isOpen={deleteConfirmOpen}
        onClose={toggleDeleteConfirmOpen}
        children={<DeleteDrashahConfirm />}
      />
    </div>
  );
};

export default EditDrashah;
