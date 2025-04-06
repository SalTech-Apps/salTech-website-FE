"use client";
import React, { useEffect, useState, useRef } from "react";

export default function JobApplication() {
  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  const handleLoad = () => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasLoaded.current) {
        setLoading(false);
      }
    }, 10000); // 10 seconds fallback
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative border rounded-md shadow overflow-hidden">
        {loading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-10"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="text-center">
              <div className=" mx-auto h-16 w-16 mb-4 border-8 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Loading...
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Please wait while the form loads.
              </p>
            </div>
          </div>
        )}
        <iframe
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=LfZ-owP40Ee7OtIQbwYlczDfOuREcK1KreJzsqSBCElUNTRWNVlUQzZTNUtCRzQ5SkVRNVhLUFBJWS4u"
          width="100%"
          height="100vh"
          title="SalTech Job Application Form"
          className="w-full border-0"
          onLoad={handleLoad}
          style={{ minHeight: "80vh" }}
        />
      </div>
      {/* Fallback message if the iframe fails to load within the timeout */}
      {!loading && !hasLoaded.current && (
        <div className="mt-4 text-center">
          <p className="text-red-600">
            It looks like the form couldn't load. Please try again or use a
            different browser.
          </p>
        </div>
      )}
    </div>
  );
}
