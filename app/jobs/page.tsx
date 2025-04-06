// pages/job-application.tsx

import React from "react";

export default function JobApplicationPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">SalTech Job Application</h1>
      <p className="mb-6">
        Apply for a position at SalTech using our secure application form. You
        can also import your details directly from LinkedIn.
      </p>

      {/* LinkedIn Import Button */}
      {/* <div className="mb-6">
        <a
          href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_SECURE_RANDOM&scope=r_liteprofile%20r_emailaddress"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-700 text-white px-6 py-3 rounded shadow hover:bg-blue-800 transition"
        >
          Import from LinkedIn
        </a>
      </div> */}

      {/* Microsoft Form Embedded via iFrame */}
      <div className="border rounded-md shadow overflow-hidden">
        <iframe
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=LfZ-owP40Ee7OtIQbwYlczDfOuREcK1KreJzsqSBCElUNTRWNVlUQzZTNUtCRzQ5SkVRNVhLUFBJWS4u"
          width="100%"
          height="900"
          frameBorder="0"
          title="SalTech Job Application Form"
          className="w-full"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
