import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 dark:border-gray-700 h-16 w-16 mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we load the application.
        </p>
      </div>
    </div>
  );
}
