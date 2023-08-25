import { Link } from "react-router-dom";

export interface AdminMenuItemInteface {
  text: string;
  url: string;
}

const AdminMenuItem = ({ text, url }: AdminMenuItemInteface) => {
  return (
    <Link to={"/" + url}>
      <div className="h-24 flex flex-col justify-center border-2 border-blue-200 m-6 rounded-md text-center">
        {text}
      </div>
    </Link>
  );
};

export default AdminMenuItem;
