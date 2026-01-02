import { useState } from "react";
import api from "./api/axios";
import Search from "./components/Search";
import Card from "./components/Card";
import LoadingIcon from "./components/LoadingIcon";
import type { SearchParams, Segment } from "./models";
import MenuBar from "./components/MenuBar";

function App() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchParams: SearchParams) => {
    setIsLoading(true); // Start loading
    try {
      const response = await api.get("/segment/search", {
        params: searchParams,
      });
      // console.log("----> ", response.data);
      setSegments(response.data["segments"]);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false); //Stop loading regardless of success/fail
    }
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-4">
        <div className="col-span-12">
          <MenuBar />
        </div>
        <div className="col-span-12 mx-4 md:col-start-3 md:col-end-10 border border-gray-300 rounded-xl">
          <h1 className="text-center text-3xl font-bold mt-3 mb-6">
            Find Your Next Climb
          </h1>
          <Search onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div className="col-span-12 mx-4 md:col-start-3 md:col-end-10">
          {isLoading ? (
            <LoadingIcon />
          ) : (
            Array.isArray(segments) &&
            segments.map((segment) => (
              <div key={segment.id}>
                <Card segment={segment} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
