import { useState } from "react";
import type { SearchParams } from "../models";

interface SearchProps {
  onSearch: (filters: SearchParams) => void;
  isLoading: boolean;
}

export default function Search({ onSearch, isLoading }: SearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: "",
    radius: 25,
  });

  const handleSubmit = () => {
    onSearch(searchParams);
  };

  return (
    <>
      <div className="grid grid-cols-9 gap-4 p-4">
        <div className="col-start-1 col-end-10 flex flex-col">
          <label className="text-sm font-medium text-slate-900 mb-2">
            City Name
          </label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2"
            placeholder="San Francisco, CA"
            value={searchParams.location}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                location: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-9">
          <label
            htmlFor="default-range"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Search Within: {searchParams.radius} miles
          </label>
          <input
            id="default-range"
            type="range"
            min="0"
            max="25"
            value={searchParams.radius}
            className="w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer"
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                radius: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="col-span-2 col-start-1 text-xs text-gray-500">
          0 miles
        </div>
        <div className="col-span-2 col-end-10 text-xs text-gray-500 text-right">
          25 miles
        </div>
        <div className="col-span-9">
          <button
            disabled={isLoading}
            className={`w-full text-white font-bold py-2 px-4 rounded 
              ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }
            `}
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
