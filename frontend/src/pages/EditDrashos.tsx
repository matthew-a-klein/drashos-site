import React from "react";
import { getDrashos } from "../api-requests/getDrashos";
import { Outlet, redirect, useLoaderData } from "react-router";
import DrashahMenu from "../components/DrashahMenu";
import { DrashahMenuItemInterface } from "../components/DrashahMenuItem";

export const loader = async () => {
  const data = await getDrashos();

  return data;
};

const EditDrashos = () => {
  const data = useLoaderData();
  const menu = data as DrashahMenuItemInterface[];
  return (
    <div className="flex">
      <div className="border-r-2 mt-6 border-spacing-2 border-indigo-700">
        {<DrashahMenu items={menu} />}
      </div>
      <div id="detail" className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default EditDrashos;
