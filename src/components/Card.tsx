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
              data-slot="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-md gap-1.5 has-[&gt;svg]:px-2.5 bg-blue-600 hover:bg-blue-700 text-white h-9 px-3"
              onClick={() =>
                redirectToGoogleMaps(segment.start_latlng, segment.end_latlng)
              }
            >
              <span className="hidden sm:inline mr-1">View</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-right w-4 h-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
