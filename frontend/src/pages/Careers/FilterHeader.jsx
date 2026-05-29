import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { TYPE_LABELS } from "../../utils/constants";

export function FilterHeader({
  search,
  setSearch,
  selectedTypes,
  setSelectedTypes,
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  setSelectedLocations,
  setCurrentPage,
  handleSearchClick,
  allTypes,
  allCategories,
  allLocations,
  hasFilters,
}) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 w-full max-w-md mr-2">
          <div className="relative w-full">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by title, skill, or keyword…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-12 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleSearchClick}
            className="inline-flex items-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-xl text-sm"
          >
            Search
          </button>
        </div>

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={allTypes}
          getOptionLabel={(opt) => TYPE_LABELS[opt] || opt}
          isOptionEqualToValue={(option, value) => option === value}
          value={selectedTypes}
          onChange={(_, val) => {
            setSelectedTypes(val);
            setCurrentPage(1);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props} className="flex items-center gap-2">
              <Checkbox size="small" checked={selected} />
              <span>{TYPE_LABELS[option] || option}</span>
            </li>
          )}
          renderTags={(value) =>
            value && value.length ? (
              <span className="text-sm text-slate-700">
                {value.length} selected
              </span>
            ) : null
          }
          renderInput={(params) => (
            <TextField {...params} size="small" label="Employment Type" />
          )}
          className="min-w-[200px]"
        />

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={allCategories}
          getOptionLabel={(opt) => opt.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={allCategories.filter((c) => selectedCategories.includes(c.id))}
          onChange={(_, val) => {
            setSelectedCategories(val.map((c) => c.id));
            setCurrentPage(1);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props} className="flex items-center gap-2">
              <Checkbox size="small" checked={selected} />
              <span>{option.name}</span>
            </li>
          )}
          renderTags={(value) =>
            value && value.length ? (
              <span className="text-sm text-slate-700">
                {value.length} selected
              </span>
            ) : null
          }
          renderInput={(params) => (
            <TextField {...params} size="small" label="Category" />
          )}
          className="min-w-[240px]"
        />

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={allLocations}
          getOptionLabel={(opt) => opt}
          isOptionEqualToValue={(option, value) => option === value}
          value={selectedLocations}
          onChange={(_, val) => {
            setSelectedLocations(val);
            setCurrentPage(1);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props} className="flex items-center gap-2">
              <Checkbox size="small" checked={selected} />
              <span>{option}</span>
            </li>
          )}
          renderTags={(value) =>
            value && value.length ? (
              <span className="text-sm text-slate-700">
                {value.length} selected
              </span>
            ) : null
          }
          renderInput={(params) => (
            <TextField {...params} size="small" label="Location" />
          )}
          className="min-w-[200px]"
        />

        <div className="ml-3">
          {hasFilters ? (
            <button
              onClick={() => {
                setSelectedTypes([]);
                setSelectedCategories([]);
                setSelectedLocations([]);
                setSearch("");
                setCurrentPage(1);
              }}
              className="text-xs text-cyan-600 hover:text-cyan-800 font-medium"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
