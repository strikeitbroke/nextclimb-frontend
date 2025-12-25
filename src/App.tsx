import { useEffect, useState } from "react";
import api from "./api/axios";
import Search from "../src/components/Search";
import type { SearchParams } from "./models";

function App() {
  const [data, setData] = useState([]);

  const handleSearch = async (searchParams: SearchParams) => {
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
        <div className="col-span-1 search-bar">
          <Search onSearch={handleSearch} />
        </div>
        <div className="col-span-1">
          <ul>
            {data.map((segment) => (
              <>
                {/* The Card Container */}
                <div
                  key={segment.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center"
                >
                  {/* Left Side: Content */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {segment.name}
                    </h2>

                    <div className="flex gap-4 text-sm text-slate-500">
                      <p>
                        <span className="font-normal">Distance:</span>
                        <span className="ml-1 text-slate-600">
                          {segment.distance} km
                        </span>
                      </p>
                      <p>
                        <span className="font-normal">Avg. Grade:</span>
                        <span className="ml-1 text-slate-600">
                          {segment.avg_grade}%
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Difficulty Badge */}
                  <div>
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Hard
                    </span>
                  </div>
                </div>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
