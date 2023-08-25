import rebbe from "../images/peakpx.jpg";
import { useAuth } from "../utils/useAuth";
const Navbar = () => {
  const { isAuthenticated } = useAuth()!;
  return (
    <div className="flex justify-between w-full h-20 bg-slate-700">
      {isAuthenticated && (
        <div className="flex flex-col justify-center text-white ml-6">
          Logged In
        </div>
      )}
      {<img className="rounded-full w-32 m-2 mr-6 " src={rebbe} />}
    </div>
  );
};

export default Navbar;
