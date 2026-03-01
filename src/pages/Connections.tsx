import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import MenuBar from "../components/MenuBar";

function Connections() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [stravaConnected, setStravaConnected] = useState(false);
  const [resyncing, setResyncing] = useState(false);

  useEffect(() => {
    if (!token) return;
    api
      .get("/auth/strava/status")
      .then((res) => setStravaConnected(res.data.connected))
      .catch(() => {});
  }, [token]);

  const handleStravaResync = async () => {
    setResyncing(true);
    try {
      await api.post("/auth/strava/resync");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        // Token revoked on Strava's side — fall back to full OAuth
        handleStravaConnect();
      }
    } finally {
      setResyncing(false);
    }
  };

  const handleStravaConnect = () => {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "http://localhost:5173/connections/strava/callback",
    );
    const scope = "read,activity:read_all";
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };
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
              {stravaConnected ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Connected
                  </span>
                  <button
                    data-slot="button"
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm text-gray-600 border border-gray-300 rounded-sm px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                    onClick={handleStravaResync}
                    disabled={resyncing}
                  >
                    {resyncing ? "Syncing..." : "Re-sync"}
                  </button>
                </div>
              ) : (
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm text-white bg-gray-800 rounded-sm px-3 py-1"
                  onClick={handleStravaConnect}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connections;
