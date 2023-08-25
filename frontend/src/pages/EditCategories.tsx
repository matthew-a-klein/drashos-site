import React, { useEffect } from "react";
import { getDrashos } from "../api-requests/getDrashos";
import { ActionFunctionArgs, Outlet, useLoaderData } from "react-router";
import DrashahMenu from "../components/DrashahMenu";
import { DrashahMenuItemInterface } from "../components/DrashahMenuItem";
import { getCategories } from "../api-requests/getCategories";
import { deleteCategory } from "../api-requests/deleteCategory";

export const loader = async () => {
  const data = await getCategories();
  return data;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const id = Object.fromEntries(await request.formData()).id.toString();
  deleteCategory(id);
};

const EditCategories = () => {
  const data = useLoaderData();

  const menu = data as DrashahMenuItemInterface[];
  return (
    <div className="flex h-screen">
      <div>{<DrashahMenu items={menu} />}</div>
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default EditCategories;
