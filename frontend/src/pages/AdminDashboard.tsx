import { useNavigate } from "react-router";
import AdminMenuItem from "../components/AdminMenuItem";
import { useAuth } from "../utils/useAuth";

const AdminDashboard = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const handleLogout = () => {
    auth?.signOut();
    nav("/");
  };
  return (
    <div className="max-w-lg mx-auto text-center ">
      <div className="mt-6 text-3xl text-slate-700 underline">
        Admin Dashboard
      </div>
      <AdminMenuItem text="Upload a Drashah" url="uploaddrashah" />
      <AdminMenuItem text="Upload a category" url="uploadcategory" />
      <AdminMenuItem text="Edit all of the drashos" url="editdrashos" />
      <AdminMenuItem text="Edit all of the categories" url="editcategories" />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
