import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/User";

type SignupForm = User & {
  confirmPassword: string;
};

function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit = (data: SignupForm) => {
    const success = signup({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!success) {
      alert("Email already registered!");
      return;
    }

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Create Account
        </h1>

        {/* Name */}
        <input
          {...register("name", {
            required: "Name is required",
          })}
          placeholder="Enter your name"
          className="w-full border border-gray-300 dark:border-gray-600 
bg-white dark:bg-gray-800 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400 
p-3 rounded-lg mb-2 outline-none 
focus:ring-2 focus:ring-purple-500"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
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
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
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

        {/* Confirm Password */}
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="Confirm your password"
          className="w-full border border-gray-300 dark:border-gray-600 
bg-white dark:bg-gray-800 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400 
p-3 rounded-lg mb-2 outline-none 
focus:ring-2 focus:ring-purple-500"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-3">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4 hover:bg-purple-700"
        >
          Sign Up
        </button>

        <p className="text-center mt-5 dark:text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
