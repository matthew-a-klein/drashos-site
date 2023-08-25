import { ChangeEvent, useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import { getCategories } from "../api-requests/getCategories";
import { getCategory } from "../api-requests/getCategory";
import { editCategory } from "../api-requests/editCategory";
import { EditCategoryLoaderData } from "../types/LoaderDataTypes/EditCategoryLoaderData";
import PopupModal from "../components/PopupModal";
import DeleteCategoryConfirm from "../components/DeleteCategoryConfirm";
import { Category } from "../types/Category";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [categories, category] = (await Promise.all([
    getCategories(),
    getCategory(params.id!),
  ])) as [Category[], Category];
  const index = categories.map((category) => category.id).indexOf(params.id!);
  categories.splice(index, 1);

  return {
    categories: categories,
    category: category,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  let subcategories: string[] = data.subcategories?.toString().split(",")!;
  if (subcategories[0] === "") {
    subcategories = [];
  }

  let supercategories: string[] = data.supercategories?.toString().split(",")!;
  if (supercategories[0] === "") {
    supercategories = [];
  }
  return editCategory(
    params.id!,
    data.title.toString(),
    data.description!.toString(),
    subcategories,
    supercategories
  );
};

const EditCategory = () => {
  const { id } = useParams();
  const submit = useSubmit();

  const { categories, category } = useLoaderData() as EditCategoryLoaderData;

  const [formTextData, setFormTextData] = useState({
    title: category.title,
    description: category.description,
  });

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormTextData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    setFormTextData({
      title: category.title,
      description: category.description,
    });
    setSubcategories(category.subcategory);
    setSupercategories(category.supercategory);
  }, [category]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const toggleDeleteConfirmOpen = () => {
    setDeleteConfirmOpen(!deleteConfirmOpen);
  };

  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [supercategories, setSupercategories] = useState<string[]>([]);

  const handleSubcategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.name;
    const updatedSubcategories = subcategories.includes(id)
      ? subcategories.filter((item) => item !== id)
      : [...subcategories, id];

    setSubcategories(updatedSubcategories);
  };

  const handleSupercategoriesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.name;
    const updatedSupercategories = supercategories.includes(id)
      ? supercategories.filter((item) => item !== id)
      : [...supercategories, id];

    setSupercategories(updatedSupercategories);
  };

  const handleSubmit = () => {
    submit(
      {
        title: formTextData.title,
        description: formTextData.description,
        subcategories: subcategories,
        supercategories: supercategories,
      },
      {
        method: "post",
        action: `/editcategories/${id}/`,
      }
    );
  };
  return (
    <div className="text-center">
      <Form
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        }}
        method="post"
        className="max-w-md mx-auto mt-8 border-2 border-blue-600 p-8 rounded-lg text-center"
      >
        <div>
          <input
            className="border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            name="title"
            placeholder="Title"
            value={formTextData.title}
            onChange={handleTextInputChange}
          ></input>
        </div>
        <div>
          <input
            className="mt-8 border-2 border-blue-100 p-2 rounded-md w-72"
            type="text"
            name="description"
            placeholder={"Description"}
            value={formTextData.description}
            onChange={handleTextInputChange}
          ></input>
        </div>
        <div className="mt-8">Subcategories</div>
        <div className=" mx-auto  border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {categories.map((subcategory) => (
            <div key={subcategory.id}>
              {" "}
              <input
                type="checkbox"
                name={subcategory.id}
                value={subcategory.id}
                onChange={handleSubcategoriesInputChange}
                checked={subcategories.includes(subcategory.id)}
              ></input>
              <label>{subcategory.title}</label>
            </div>
          ))}
        </div>
        <div className="mt-8">Supercategories</div>
        <div className=" mx-auto border-2 border-blue-100 p-2 rounded-md w-72 h-32 overflow-scroll">
          {categories.map((supercategory) => (
            <div key={supercategory.id}>
              {" "}
              <input
                type="checkbox"
                key={Math.random()}
                name={supercategory.id}
                value={supercategory.id}
                onChange={handleSupercategoriesInputChange}
                checked={supercategories.includes(supercategory.id)}
              ></input>
              <label>{supercategory.title}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-slate-300 mt-4 border-2 border-slate-400 rounded-md"
        >
          Edit
        </button>
      </Form>
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
      <PopupModal
        isOpen={deleteConfirmOpen}
        onClose={toggleDeleteConfirmOpen}
        children={<DeleteCategoryConfirm />}
      />
    </div>
  );
};

export default EditCategory;
