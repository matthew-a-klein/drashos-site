import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Base = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mb-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Base;
