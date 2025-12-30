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
      <div className="grid grid-cols-9 gap-4 border border-gray-300 p-4 border border-gray-200 rounded-xl">
        <div className="col-start-1 col-span-4">
          <label className="text-sm font-medium text-slate-900">
            City Name
          </label>
        </div>
        <div className="col-start-1 col-end-10">
          <input
            className="border border-gray-300"
            placeholder="type here..."
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
            Search Range: {searchParams.radius} miles
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
        <div className="col-span-1 col-start-1">0 miles</div>
        <div className="col-span-1 col-end-10">25 miles</div>
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
