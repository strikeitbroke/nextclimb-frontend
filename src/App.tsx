import { useState } from "react";
import api from "./api/axios";
import Search from "../src/components/Search";
import Card from "../src/components/Card";
import type { SearchParams, Segment } from "./models";

function App() {
  const [segments, setSegments] = useState<Segment[]>([]);

  const handleSearch = async (searchParams: SearchParams) => {
    try {
      const response = await api.get("/segment/search", {
        params: searchParams,
      });
      console.log("----> ", response.data);
      setSegments(response.data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-4">
        <div className="col-span-12 justify-self-center">
          <h1 className=""> Find Your Next Climb</h1>
        </div>
        <div className="col-span-12 col-start-3 col-end-10">
          <Search onSearch={handleSearch} />
        </div>
        <div className="col-span-12 col-start-3 col-end-10">
          {Array.isArray(segments) &&
            segments.map((segment) => (
              <div key={segment.id}>
                <Card segment={segment} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
