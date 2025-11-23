"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handleLogin = (providerName) => {
    signIn(providerName);
  };

  useEffect(() => {
    if (!session?.data) return;
    if (session?.data?.user) {
      router.push("/");
      toast.success("Login success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.data]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-xl font-bold mt-2">Social Login Account</h3>
      <div className="flex mt-3  gap-5">
        <button
          type="button"
          className="btn"
          onClick={() => handleLogin("google")}
        >
          <FaGoogle size={30} />
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => handleLogin("google")}
        >
          <FaGithub size={30} />
        </button>
      </div>
    </div>
  );
}
