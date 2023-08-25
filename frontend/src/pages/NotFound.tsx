import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className={`h-screen max-w-lg  mt-24 mx-auto text-center`}>
        <div className="text-5xl"> 404 Not Found</div>
        <div className="mt-4">
          Click <Link to="/">here</Link> to go home
        </div>
      </div>
    </>
  );
};

export default NotFound;
