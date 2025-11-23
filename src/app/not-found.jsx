import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-extrabold text-primary">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="text-base mt-2 max-w-md text-base-content">
        Sorry! The page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6">
        <Link href="/">
          <button className="btn btn-primary btn-wide text-lg">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
