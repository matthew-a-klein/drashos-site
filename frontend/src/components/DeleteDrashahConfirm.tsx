import { useNavigate, useParams } from "react-router";
import { deleteDrashah } from "../api-requests/deleteDrashah";

const DeleteDrashahConfirm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <div>
      <div>Are you sure you want to delete this drashah?</div>
      <div>
        <button
          onClick={() => {
            deleteDrashah(id!);
            nav("/editdrashos");
          }}
        >
          yes
        </button>
      </div>
    </div>
  );
};

export default DeleteDrashahConfirm;
