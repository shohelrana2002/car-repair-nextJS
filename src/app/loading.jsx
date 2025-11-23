import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
      <p className="text-lg font-medium text-base-content">Loading...</p>
    </div>
  );
};

export default Loading;
