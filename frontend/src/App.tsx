import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthProvider from "./utils/AuthProvider";
import LoginPage from "./pages/LoginPage";
import UploadDrashah, {
  action as drashahUploadAction,
  loader as drashahUploadLoader,
} from "./pages/UploadDrashah";
import ViewDrashah, { loader as viewDrashahLoader } from "./pages/ViewDrashah";
import ViewDrashos, { loader as viewDrashosLoader } from "./pages/ViewDrashos";
import EditDrashos, { loader as editDrashosLoader } from "./pages/EditDrashos";
import EditDrashah, {
  loader as editDrashahLoader,
  action as editDrashahAction,
} from "./pages/EditDrashah";
import Base from "./components/Base";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import UploadCategory, {
  loader as uploadCategoryLoader,
  action as uploadCategoryAction,
} from "./pages/UploadCategory";
import EditCategories, {
  loader as editCategoriesLoader,
  action as EditCategoriesAction,
} from "./pages/EditCategories";
import EditCategory, {
  loader as editCategoryLoader,
  action as editCategoryAction,
} from "./pages/EditCategory";
import PublicRoute from "./utils/PublicRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Base />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "login",
          element: <PublicRoute outlet={<LoginPage />} />,
        },
        {
          path: "admin",
          element: <PrivateRoute outlet={<AdminDashboard />} />,
        },
        {
          path: "uploaddrashah",
          element: <PrivateRoute outlet={<UploadDrashah />} />,
          action: drashahUploadAction,
          loader: drashahUploadLoader,
        },
        {
          path: "viewdrashos",
          element: <ViewDrashos />,
          loader: viewDrashosLoader,
          children: [
            {
              path: ":id",
              element: <ViewDrashah />,
              loader: viewDrashahLoader,
            },
          ],
        },
        {
          path: "editdrashos",
          element: <PrivateRoute outlet={<EditDrashos />} />,
          loader: editDrashosLoader,
          children: [
            {
              path: ":id",
              element: <EditDrashah />,
              loader: editDrashahLoader,
              action: editDrashahAction,
            },
          ],
        },
        {
          path: "uploadcategory",
          element: <PrivateRoute outlet={<UploadCategory />} />,
          loader: uploadCategoryLoader,
          action: uploadCategoryAction,
        },
        {
          path: "editcategories",
          element: <PrivateRoute outlet={<EditCategories />} />,
          loader: editCategoriesLoader,
          action: EditCategoriesAction,

          children: [
            {
              path: ":id",
              element: <EditCategory />,
              loader: editCategoryLoader,
              action: editCategoryAction,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
