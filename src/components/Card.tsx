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

  // 2. Get the color based on the segment difficulty (fallback to gray if not found)
  const cardDiffColor = difficultyColors[segment.difficulty] || "bg-gray-500";
  return (
    <>
      <div className="grid grid-cols-9 gap-4 border border-gray-200 rounded-xl p-4 my-4">
        <div className="col-span-9 flex justify-between">
          <div className="card-detail flex flex-col">
            <div className="card-title">
              <h2>{segment.name}</h2>
            </div>
            <div className="card-location-dist-grade flex">
              <p className="mr-2">Distance: {segment.distance} miles</p>
              <p>Avg. Grade: {segment.avg_grade}% </p>
            </div>
          </div>
          <div className="">
            <span
              className={`${cardDiffColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
            >
              {segment.difficulty}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
