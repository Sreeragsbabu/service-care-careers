import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_JOBS } from "./jobs";
import { formatSalary } from "../utils/formatSalary";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function JobDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    const scrollContainer = document.getElementById("routes-container");
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);
  const job = MOCK_JOBS.find((j) => j._id === id);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    linkedin: "",
  });
  const [resume, setResume] = useState(null);
  const [consent, setConsent] = useState(false);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Job not found</h2>
        <p className="text-slate-600">The job you requested was not found.</p>
        <Link to="/careers" className="text-cyan-500 underline mt-4 block">
          Back to Careers
        </Link>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    setResume(e.target.files?.[0] || null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!consent) {
      alert(
        "Please accept how we store and handle your data to submit the application.",
      );
      return;
    }
    // Replace with API call to submit application
    const payload = { jobId: id, ...form, resumeName: resume?.name };
    console.log("Submitting application:", payload);
    alert("Application submitted — check console for payload.");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      linkedin: "",
    });
    setResume(null);
    setConsent(false);
  }

  // Helper icons renderer
  const renderIcon = (name) => {
    if (name === "location")
      return (
        <svg
          className="h-5 w-5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
          />
        </svg>
      );
    if (name === "salary")
      return (
        <svg
          className="h-5 w-5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-4 0-6 1.5-6 4s2 4 6 4 6-1.5 6-4-2-4-6-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v4m0 8v4"
          />
        </svg>
      );
    if (name === "experience")
      return (
        <svg
          className="h-5 w-5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    return null;
  };

  const orgName = job.organization || job.category?.name || "Company";

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Job Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 3h8v4H8z"
                  />
                </svg>
                <span className="font-medium">{orgName}</span>
              </div>
              <div className="flex items-center gap-2">
                {renderIcon("location")}
                <span>
                  {job.location.slice(0, 3).join(", ")}
                  {job.location.length > 3
                    ? ` +${job.location.length - 3}`
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700">
              <div className="flex items-center gap-3">
                {renderIcon("salary")}
                <div>
                  <div className="text-xs text-slate-500">Salary</div>
                  <div className="font-medium">
                    {formatSalary(job.salary.min)} —{" "}
                    {formatSalary(job.salary.max)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {renderIcon("experience")}
                <div>
                  <div className="text-xs text-slate-500">Experience</div>
                  <div className="font-medium">
                    {job.experience.min} — {job.experience.max} yrs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14v7"
                  />
                </svg>
                <div>
                  <div className="text-xs text-slate-500">Employment</div>
                  <div className="font-medium">{job.employmentType}</div>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">About the role</h2>
            <p className="text-slate-700 whitespace-pre-line">
              {job.description}
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <ul className="space-y-2 text-slate-700">
              {job.responsibilities?.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 mt-1 text-cyan-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Application Form */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3">Apply</h2>
            <p className="text-sm text-slate-600 mb-4">
              Complete the form below to apply for this role.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-600">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">
                  LinkedIn (optional)
                </label>
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFile}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-300 text-cyan-600 rounded cursor-pointer hover:bg-cyan-100 transition-colors font-medium text-sm"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Choose file
                  </label>
                  {resume && (
                    <div className="text-sm text-cyan-600 mt-2 font-medium">
                      ✓ {resume.name}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600">
                  Cover letter (optional)
                </label>
                <textarea
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      sx={{ color: "#0ea5a4" }}
                    />
                  }
                  label={
                    <div className="text-sm text-slate-700">
                      I agree to the storage and handling of my data by this
                      website for recruitment purposes.{" "}
                      <Link to="/privacy" className="text-cyan-600 underline">
                        Learn more
                      </Link>
                    </div>
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={!consent}
                  className={`px-4 py-2 rounded text-white ${consent ? "bg-cyan-500" : "bg-slate-300"}`}
                >
                  Submit application
                </button>
                <Link to="/careers" className="text-slate-600 underline">
                  Back to listings
                </Link>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
