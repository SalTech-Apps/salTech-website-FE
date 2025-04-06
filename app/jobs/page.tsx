import JobApplication from "@/components/jobs";

export default function JobApplicationPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">SalTech Job Application</h1>
      <p className="mb-6">
        Apply for a position at SalTech using our secure application form. You
        can also import your details directly from LinkedIn.
      </p>

      <JobApplication />
    </div>
  );
}
