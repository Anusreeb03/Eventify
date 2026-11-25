import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    const success = login(data.email, data.password);

    if (!success) {
      alert("Invalid email or password!");
      return;
    }

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Login
        </h1>

        {/* Email */}
        <input
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="Enter your email"
          className="w-full border border-gray-300 dark:border-gray-600 
bg-white dark:bg-gray-800 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400 
p-3 rounded-lg mb-2 outline-none 
focus:ring-2 focus:ring-purple-500"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          placeholder="Enter your password"
          className="w-full border border-gray-300 dark:border-gray-600 
bg-white dark:bg-gray-800 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400 
p-3 rounded-lg mb-2 outline-none 
focus:ring-2 focus:ring-purple-500"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4 hover:bg-purple-700"
        >
          Login
        </button>

        <p className="text-center mt-5 dark:text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
