import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";

function Connections() {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-span-12">
        <MenuBar />
      </div>
      <div className="grid grid-cols-11 gap-4 pt-4">
        <div className="col-span-11 md:col-start-3 md:col-end-10">
          <button className="flex items-center" onClick={() => navigate("/")}>
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
              className="lucide lucide-arrow-left w-4 h-4 mr-2"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Back to Routes
          </button>
        </div>
        <div className="col-span-11 md:col-start-3 md:col-end-10 ">
          <p className="text-2xl font-bold">Connected Apps</p>
          <p>
            Connect your fitness apps to get personalized route recommendations
            based on your training data
          </p>
        </div>
        <div className="col-span-11 md:col-start-3 md:col-end-10 border border-gray-300 rounded-xl px-4 py-6">
          <div className="flex item-start justify-between">
            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div>Strava</div>
                <div
                  data-slot="card-description"
                  className="text-muted-foreground text-sm"
                >
                  Connect your Strava account to get personalized route
                  recommendations based on your activities
                </div>
              </div>
            </div>
            <div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm text-white bg-gray-800 rounded-sm px-3 py-1"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connections;
