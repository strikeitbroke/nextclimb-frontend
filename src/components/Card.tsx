import type { Segment } from "../models";

interface SegmentProp {
  segment: Segment;
}

export default function Card({ segment }: SegmentProp) {
  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-600",
    Intermediate: "bg-orange-500",
    Hard: "bg-red-600",
  };
  const redirectToGoogleMaps = (
    start: [number, number],
    end: [number, number],
  ) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${start[0]},${start[1]}&destination=${end[0]},${end[1]}&travelmode=bicycling`;
    window.open(url, "_blank");
  };

  const redirectToStravaSegment = (segmentId: number) => {
    const url = `https://www.strava.com/segments/${segmentId}`;
    window.open(url, "_blank");
  };
  // 2. Get the color based on the segment difficulty (fallback to gray if not found)
  const cardDiffColor = difficultyColors[segment.difficulty] || "bg-gray-500";
  return (
    <>
      <div className="grid grid-cols-11 gap-4 border border-gray-200 rounded-xl p-4 my-4">
        <div className="col-span-11 flex justify-between items-center">
          <div className="card-detail flex flex-col">
            <div className="card-title font-bold">
              <h2>{segment.name}</h2>
            </div>
            <div className="card-location-dist-grade flex flex-wrap text-gray-600">
              <p className="mr-2">Distance: {segment.distance} miles</p>
              <p>Avg. Grade: {segment.avg_grade}% </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`${cardDiffColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
            >
              {segment.difficulty}
            </span>
            <button
              title="Open in Google Maps"
              data-slot="button"
              className="border rounded p-2.5 border-gray-400"
              onClick={() =>
                redirectToGoogleMaps(segment.start_latlng, segment.end_latlng)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map w-4 h-4"
              >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path>
                <path d="M15 5.764v15"></path>
                <path d="M9 3.236v15"></path>
              </svg>
            </button>
            <button
              data-slot="button"
              className="border-none rounded p-2.5 bg-orange-500 text-white"
              title="Find on Strava"
              onClick={() => redirectToStravaSegment(segment.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-external-link w-4 h-4"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
