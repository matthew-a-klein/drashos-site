import { useNavigate } from "react-router-dom";

export interface DrashahMenuItemInterface {
  title: string;
  id: string;
}

const DrashahMenuItem = ({ title, id }: DrashahMenuItemInterface) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(id);
  };
  return (
    <div>
      <button onClick={handleClick}>
        <div className="w-72 border-2 text-center rounded-md border-slate-500 p-2 m-2">
          {" "}
          {title}
        </div>
      </button>
    </div>
  );
};

export default DrashahMenuItem;
