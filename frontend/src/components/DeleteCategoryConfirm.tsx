import { useNavigate, useParams } from "react-router";
import { useSubmit } from "react-router-dom";

const DeleteCategoryConfirm = () => {
  const { id } = useParams();
  const submit = useSubmit();
  const nav = useNavigate();
  return (
    <div>
      <div>Are you sure you want to delete this drashah?</div>
      <div>
        <button
          className="py-2 px-4 mt-4 border-2 rounded-md border-slate-400"
          onClick={() => {
            submit(
              {
                id: id!,
              },
              {
                method: "post",
                action: "/editcategories/",
              }
            );
            nav("/editcategories");
          }}
        >
          yes
        </button>
      </div>
    </div>
  );
};

export default DeleteCategoryConfirm;
