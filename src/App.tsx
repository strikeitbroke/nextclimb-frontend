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
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchParams: SearchParams) => {
    setIsLoading(true); // Start loading

    if (searchParams.location.trim().length > 0) {
      setHasSearched(true);
    }
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

  const renderContent = () => {
    // check if loading first
    if (isLoading) {
      return <LoadingIcon />;
    }

    // check if user has searched
    if (!hasSearched) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400">
            Ready to find your next climb?
          </h2>
          <p className="text-gray-500">
            Enter a location above to get started.
          </p>
        </div>
      );
    }

    // 3. Check if we have actual segments to show
    if (Array.isArray(segments) && segments.length > 0) {
      return segments.map((segment) => (
        <div key={segment.id}>
          <Card segment={segment} />
        </div>
      ));
    }
    // Now your return block is beautiful and clean
    return (
      <div className="text-center">
        No climbs found here, try increase your search radius.
      </div>
    );
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
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default App;
