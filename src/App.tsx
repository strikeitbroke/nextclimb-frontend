import { useState } from "react";
import api from "./api/axios";
import Search from "./components/Search";
import Card from "./components/Card";
import FeedbackModal from "./components/FeedbackModal";
import Footer from "./components/Footer";
import LoadingIcon from "./components/LoadingIcon";
import type { SearchParams, Segment } from "./models";
import MenuBar from "./components/MenuBar";

function App() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearch, setLastSearch] = useState<SearchParams | null>(null);
  const [vote, setVote] = useState<boolean | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleSearch = async (searchParams: SearchParams) => {
    setIsLoading(true);
    setVote(null);

    if (searchParams.location.trim().length > 0) {
      setHasSearched(true);
      setLastSearch(searchParams);
    }
    try {
      const response = await api.get("/segment/search", {
        params: searchParams,
      });
      setSegments(response.data["segments"]);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (value: boolean) => {
    if (vote === value || !lastSearch) return;
    await api.post("/segment/feedback", {
      location: lastSearch.location,
      radius: lastSearch.radius,
      vote: value,
    });
    setVote(value);
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
        {hasSearched && !isLoading && (
          <div className="col-span-12 mx-4 md:col-start-3 md:col-end-10 flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-sm text-gray-600">How were your search results?</p>
            <div className="flex gap-2">
              <button
                title="Good results"
                className={`rounded p-2 border ${vote === true ? "bg-green-500 border-green-500 text-white" : "border-gray-400 text-gray-600"}`}
                onClick={() => handleVote(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
              </button>
              <button
                title="Bad results"
                className={`rounded p-2 border ${vote === false ? "bg-red-500 border-red-500 text-white" : "border-gray-400 text-gray-600"}`}
                onClick={() => handleVote(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
                </svg>
              </button>
              <button
                title="Leave feedback"
                className="rounded p-2 border border-gray-400 text-gray-600"
                onClick={() => setShowFeedbackModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
          </div>
        )}
        {showFeedbackModal && lastSearch && (
          <FeedbackModal
            searchParams={lastSearch}
            onClose={() => setShowFeedbackModal(false)}
          />
        )}
        <div className="col-span-12 mx-4 md:col-start-3 md:col-end-10">
          {renderContent()}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
