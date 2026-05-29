import { useState, useMemo, useRef } from "react";
import { MOCK_JOBS } from "../jobs";
import { JobCard } from "../../components/JobCard";
import { SortDropdown } from "../../components/SortDropdown";
import { Pagination } from "../../components/Pagination";
import { TYPE_LABELS } from "../../utils/constants";
import { Header } from "./Header";
import { FilterHeader } from "./FilterHeader";
import { ChipButton } from "./ChipButton";

const PAGE_SIZE = 12;

export default function Careers({ jobs = MOCK_JOBS }) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const listingTopRef = useRef(null);

  // Derive filter options from data
  const allTypes = useMemo(
    () => [...new Set(jobs.map((j) => j.employmentType))],
    [jobs],
  );
  const allCategories = useMemo(
    () =>
      [
        ...new Map(
          jobs.map((j) => [j.category._id, j.category.name]),
        ).entries(),
      ].map(([id, name]) => ({ id, name })),
    [jobs],
  );
  const allLocations = useMemo(
    () => [...new Set(jobs.flatMap((j) => j.location))].sort(),
    [jobs],
  );

  const toggle = (arr, setArr, val) => {
    setCurrentPage(1);
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => j.status !== "draft");

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.category.name.toLowerCase().includes(q),
      );
    }
    if (selectedTypes.length)
      result = result.filter((j) => selectedTypes.includes(j.employmentType));
    if (selectedCategories.length)
      result = result.filter((j) =>
        selectedCategories.includes(j.category._id),
      );
    if (selectedLocations.length)
      result = result.filter((j) =>
        j.location.some((l) => selectedLocations.includes(l)),
      );

    if (sortBy === "newest")
      result = [...result].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    if (sortBy === "salary-high")
      result = [...result].sort((a, b) => b.salary.max - a.salary.max);
    if (sortBy === "experience")
      result = [...result].sort((a, b) => a.experience.min - b.experience.min);

    return result;
  }, [
    jobs,
    search,
    selectedTypes,
    selectedCategories,
    selectedLocations,
    sortBy,
  ]);

  const hasFilters =
    selectedTypes.length ||
    selectedCategories.length ||
    selectedLocations.length ||
    search;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  // Clamp currentPage so stale page values after filter changes never go out of bounds
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    listingTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearchClick = () => {
    // Ensure page resets and scroll to results when user clicks Search
    setCurrentPage(1);
    listingTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <Header />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-8">
          <FilterHeader
            search={search}
            setSearch={setSearch}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            setCurrentPage={setCurrentPage}
            handleSearchClick={handleSearchClick}
            allTypes={allTypes}
            allCategories={allCategories}
            allLocations={allLocations}
            hasFilters={hasFilters}
          />

          {/* Listings */}
          <main className="flex-1 min-w-0" ref={listingTopRef}>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "opening" : "openings"} found
                {totalPages > 1 && (
                  <span className="text-slate-400 ml-1">
                    · page {safePage} of {totalPages}
                  </span>
                )}
              </p>
              <SortDropdown
                value={sortBy}
                onChange={(val) => {
                  setSortBy(val);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTypes.map((t) => (
                  <ChipButton
                    key={t}
                    item={{ name: TYPE_LABELS[t] || t }}
                    id={t}
                    selectedItem={selectedTypes}
                    setSelectedItem={setSelectedTypes}
                    toggle={toggle}
                  />
                ))}
                {selectedCategories.map((id) => {
                  const cat = allCategories.find((c) => c.id === id);
                  return (
                    <ChipButton
                      key={id}
                      item={cat}
                      id={id}
                      selectedItem={selectedCategories}
                      setSelectedItem={setSelectedCategories}
                      toggle={toggle}
                    />
                  );
                })}
                {selectedLocations.map((l) => (
                  <ChipButton
                    key={l}
                    item={{ name: l }}
                    id={l}
                    selectedItem={selectedLocations}
                    setSelectedItem={setSelectedLocations}
                    toggle={toggle}
                  />
                ))}
              </div>
            )}

            {/* Job grid */}
            {filtered.length > 0 ? (
              <>
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
                  {paginated.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  No openings match your filters
                </p>
                <p className="text-sm text-slate-400">
                  Try adjusting your search or clearing some filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
