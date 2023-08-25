import { Outlet, useLoaderData } from "react-router";
import { getDrashos } from "../api-requests/getDrashos";
import DrashahMenu from "../components/DrashahMenu";
import { DrashahMenuItemInterface } from "../components/DrashahMenuItem";

export const loader = async () => {
  const data = await getDrashos();
  return data;
};

const ViewDrashos = () => {
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

export default ViewDrashos;
