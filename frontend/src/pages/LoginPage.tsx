import { ChangeEvent, useState } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    auth?.signIn(formData.username, formData.password).then(() => {
      nav("/admin");
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className=" text-center max-w-md mx-auto p-10 border-4 border-blue-500 rounded-3xl mt-16">
      <form>
        <input
          className="border-2 border-blue-100 p-2 rounded-md"
          type="text"
          value={formData.username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
        ></input>
        <input
          className="mt-8 border-2 border-blue-100 p-2 rounded-md"
          type="password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
        ></input>
      </form>
      <button
        className="py-2 px-4 bg-slate-300 mt-4 border-2 border-slate-400 rounded-md"
        onClick={handleSubmit}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginPage;
