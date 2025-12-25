import { useEffect, useState } from "react";
import api from "./api/axios";

interface SearchFilters {
  location: string;
  radius: number;
}

function App() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState<SearchFilters>({
    location: "",
    radius: 25,
  });

  const handleSearch = async () => {
    try {
      const response = await api.get("/segment/search", {
        params: searchParams,
      });
      console.log("----> ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold"> Find Your Next Climb</h1>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-6 gap-4 border border-gray-300 p-4">
            <div className="col-start-1 col-span-4">City Name</div>
            <div className="col-start-1 col-end-7">
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
            <div className="col-span-6">{searchParams.location}</div>
            <div className="col-span-2">Distance from city</div>
            <div className="col-span-1 col-end-7">25 km</div>
            <div className="col-span-6">
              <label
                htmlFor="default-range"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Default range: {searchParams.radius}
              </label>
              <input
                id="default-range"
                type="range"
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
            <div className="col-span-1 col-start-1">5 km</div>
            <div className="col-span-1 col-end-7">100 km</div>
            <div className="col-span-6">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <ul>
            {data.map((segment) => (
              <li key={segment.id}> {segment.avg_grade} </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
