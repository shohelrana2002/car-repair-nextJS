"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response.ok) {
        toast.success("Login success");
        return router.push("/");
      }
      if (response?.error) {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg "
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg "
              />

              {/* Show / Hide Button */}
              <div
                onClick={() => setShow(!show)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {show ? (
                  <EyeOff size={20} className="text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-600" />
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full btn btn-info"
          >
            {loading ? (
              <span className="loading text-orange-400 loading-spinner loading-md"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p>
          Are You New{" "}
          <Link className="text-primary hover:underline" href={"/register"}>
            Create a Account Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
